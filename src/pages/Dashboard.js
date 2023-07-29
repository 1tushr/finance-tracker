import React, { useEffect, useState } from "react";
import Header from "../components/Header";
// import Card from "antd/es/card/Card";
import Cards from "../components/Cards";
import Modal from "antd/es/modal/Modal";
import AddIncomeModal from "../components/Modals/AddIncome";
import AddExpenseModal from "../components/Modals/AddExpense";
import ChartComponent from "../components/Charts";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import Table from "../components/Table";
import TransactionTable from "../components/Table";
import NoTransactions from "../components/NoTransaction";
export default function Dashboard() {
  const [transaction, setTransaction] = useState([]);
  const [user] = useAuthState(auth);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };
  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };

  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };
  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };
  const onFinish = (values, type) => {
    console.log("on Finish", values, type);
    const newTransaction = {
      type: type,
      date: values.date.format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };
    addTransaction(newTransaction);
  };

  async function addTransaction(transaction, many) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      console.log("document written with id:", docRef.id);
      // let newArr=transaction;
      // newArr.push(transaction);
      // setTransaction(newArr);
      setTransaction((prevTransactions) => [...prevTransactions, transaction]);

      calculateBalance();
      if (!many) toast.success("transaction added!");
    } catch (e) {
      console.log("error in add document:", e);
      if (!many) toast.error("couldn't add transaction");
    }
  }
  useEffect(() => {
    fetchTransaction();
    // let storedData=JSON.parse( localStorage.getItem('transaction'));
  }, [user]);

  async function fetchTransaction() {
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionArray = [];
      querySnapshot.forEach((doc) => {
        transactionArray.push(doc.data());
      });
      setTransaction(transactionArray);
      console.log("dat fetched>>>>", transactionArray);
      localStorage.setItem("transaction", JSON.stringify(transactionArray));
      toast.success("data fetched");
    }
  }

  useEffect(() => {
    calculateBalance();
  }, [transaction]);

  function calculateBalance() {
    let incomeTotal = 0;
    let expenseTotal = 0;
    transaction.forEach((transaction) => {
      if (transaction.type === "income") {
        incomeTotal += transaction.amount;
      } else {
        expenseTotal += transaction.amount;
      }
    });
    setIncome(incomeTotal);
    setExpense(expenseTotal);
    setTotalBalance(incomeTotal - expenseTotal);
  }
  let sortedTransaction = transaction.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });
  return (
    <>
      <Header />
      <Cards
        income={income}
        expense={expense}
        totalBalance={totalBalance}
        showExpenseModal={showExpenseModal}
        showIncomeModal={showIncomeModal}
      />
      <AddIncomeModal
        isIncomeModalVisible={isIncomeModalVisible}
        handleIncomeCancel={handleIncomeCancel}
        onFinish={onFinish}
      ></AddIncomeModal>
      <AddExpenseModal
        isExpenseModalVisible={isExpenseModalVisible}
        handleExpenseCancel={handleExpenseCancel}
        onFinish={onFinish}
      ></AddExpenseModal>
      {transaction && transaction.length !== 0 ? (
        <ChartComponent sortedTransaction={sortedTransaction} />
      ) : (
        <NoTransactions></NoTransactions>
      )}
      <TransactionTable
        transaction={transaction}
        addTransaction={addTransaction}
        fetchTransaction={fetchTransaction}
      ></TransactionTable>
    </>
  );
}
