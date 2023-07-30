import { Radio, Select, Table } from "antd";
import React, { useState } from "react";
import "./styles.css";
import { parse, unparse } from "papaparse";
import { toast } from "react-toastify";
export default function TransactionTable({ transaction,addTransaction,fetchTransaction }) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortKey, setSortKey] = useState("");
  const { Option } = Select;
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];
  let filteredTransactions = transaction.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) &&
    item.type && item.type.includes(typeFilter)
  );
  

   filteredTransactions.sort((a, b) => {
    if (sortKey === "date") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortKey === "amount") {
      return a.amount - b.amount;
    } else {
      return 0;
    }
  });

  function exportCsv(){
    var csv = unparse({
      "fields": ["name", "amount", "tag", "type", "date" ],
      "data": transaction
    });
    var data = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
var csvURL = window.URL.createObjectURL(data);
const link = document.createElement('a');
link.href = csvURL;
link.download="transactions.csv"
document.body.appendChild(link);
link.click();
document.body.removeChild(link);
  }
  function importCsv(event) {
    event.preventDefault();
    try {
      parse(event.target.files[0], {
        header: true,
        complete: async function (results) {
          // Now results.data is an array of objects representing your CSV rows
          for (const transaction of results.data) {
            // Write each transaction to Firebase, you can use the addTransaction function here
            console.log("Transactions", transaction);
  
            // Handle NaN and empty or undefined amount
            const amountString = transaction.amount ? transaction.amount.trim().replace(/,/g, '') : '';
            const parsedAmount = amountString ? parseFloat(amountString) : 0;
  
            const newTransaction = {
              ...transaction,
              amount: isNaN(parsedAmount) ? 0 : parsedAmount,
            };
            await addTransaction(newTransaction, true);
          }
        },
      });
      toast.success("All Transactions Added");
      fetchTransaction();
      event.target.value = null; // Reset file input to allow re-importing the same file
    } catch (e) {
      toast.error(e.message);
    }
  }
  
  return (
    <>
      <div className="search-filter">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name"
          className="input"
        ></input>
        <Select
          className="select-input"
          onChange={(value) => setTypeFilter(value)}
          value={typeFilter}
          placeholder="Filter"
          allowClear
        >
          <Option value="" All>
            All Transactions
          </Option>
          <Option value="income">Income</Option>
          <Option value="expense">Expense</Option>
        </Select>
      </div>

      <div>
        <div className="table-flex">
          <h2 className="text">My Transactions</h2>

          <Radio.Group
            defaultValue="a"
            style={{ marginTop: 16 }}
            onChange={(e) => setSortKey(e.target.value)}
            value={sortKey}
          >
            <Radio.Button value="">No Sort </Radio.Button>
            <Radio.Button value="date">Sort by Date </Radio.Button>
            <Radio.Button value="amount">Sort by Amount</Radio.Button>
          </Radio.Group>


          <button className="btn width" onClick={exportCsv}>Export to CSV</button>
          <label for="file-csv" className="btn btn-blue width" >
            Import from CSV
          </label>
          <input
            id="file-csv"
            type="file"
            accept=".csv"
            onChange={importCsv}
            required
            style={{ display: "none" }}
          />

          
        </div>
        <Table
          className="table-content"
          dataSource={filteredTransactions}
          columns={columns}
        />
        
      </div>
    </>
  );

}
