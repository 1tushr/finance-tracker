import React, { useState } from "react";
import Header from "../components/Header";
// import Card from "antd/es/card/Card";
import Cards from "../components/Cards";
import Modal from "antd/es/modal/Modal";
import AddIncomeModal from "../components/Modals/AddIncome";
import AddExpenseModal from "../components/Modals/AddExpense";
export default function Dashboard() {
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
  };

  return (
    <>
      <Header />
      <Cards
        showExpenseModal={showExpenseModal}
        showIncomeModal={showIncomeModal}
      />
      {/* <Modal title="income" visible={isIncomeModalVisible}onCancel={handleIncomeCancel}footer={null}></Modal>
<Modal  title="expense" visible={isExpenseModalVisible}onCancel={handleExpenseCancel}footer={null}>Expense</Modal> */}
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
