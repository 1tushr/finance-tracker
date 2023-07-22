import React, { useState } from "react";
import Header from "../components/Header";
// import Card from "antd/es/card/Card";
import Cards from "../components/Cards";
import Modal from "antd/es/modal/Modal";
import AddIncomeModal from "../components/Modals/AddIncome";
import AddExpenseModal from "../components/Modals/AddExpense";
import { addDoc, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
export default function Dashboard() {
  const [user]=useAuthState(auth);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
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
    const newTransaction={
      type:type,
      date:(values.date).format("YYYY-MM-DD"),
      amount:parseFloat(values.amount),
      tag:values.tag,
      name:values.name,
    };
    addTransaction(newTransaction);

    
  };

  async function addTransaction(transaction){
try{
const docRef=await addDoc(
  collection(db,`users/${user.uid}/transactions`),
  transaction
);
console.log("document written with id:",docRef.id);
toast.success("transaction added!");

}
catch(e){
console.log("error in add document:",e);
toast.error("couldn't add transaction" );
}
  }

  return (
    <>
      <Header />
      <Cards
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
    </>
  );
}
