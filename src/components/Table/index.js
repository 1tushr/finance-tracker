import { Radio, Select, Table } from "antd";
import React, { useState } from "react";
import "./styles.css";
export default function TransactionTable({ transaction }) {
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
  let filteredTransactions = transaction.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      item.type.includes(typeFilter)
  );

  let sortedTransaction = filteredTransactions.sort((a, b) => {
    if (sortKey === "date") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortKey === "amount") {
      return a.amount - b.amount;
    } else {
      return 0;
    }
  });
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


          <button className="btn width">Export to CSV</button>
          <label for="file-csv" className="btn btn-blue width">
            Import from CSV
          </label>
          <input
            id="file-csv"
            type="file"
            accept=".csv"
            required
            style={{ display: "none" }}
          />

          
        </div>
        <Table
          className="table-content"
          dataSource={filteredTransactions}
          columns={columns}
        />
        ;
      </div>
    </>
  );
}
