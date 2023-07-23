// Cards.js
import React from "react";
import "./styles.css";
import { Card, Row } from "antd";
import Button from "../Button";

export default function Cards({ income,
  expense,
  totalBalance,showExpenseModal, showIncomeModal }) {
  return (
    <div>
      <Row className="card-row">
        <Card className="custom-card" title="Current balance">
          <p className="balance-text">₹{totalBalance}</p>
          <Button className="reset-button" text="Reset balance" blue={true} />
        </Card>
        <Card className="custom-card" title="Total Income">
          <p className="balance-text">₹{income}</p>
          <Button className="reset-button" text="Add income" blue={true}onClick={showIncomeModal} />
        </Card>
        <Card className="custom-card" title="Total Expenses">
          <p className="balance-text">₹{expense}</p>
          <Button className="reset-button" text="Add expense" blue={true} onClick={showExpenseModal}/>
        </Card>
      </Row>
    </div>
  );
}
