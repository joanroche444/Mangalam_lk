import React from 'react';
import { LuArrowRight } from "react-icons/lu";
import moment from 'moment'

const RecentTransactions = ({ transactions, onSeeMore }) => {
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Recent Transactions</h5>
                <button className="card-btn" onClick={onSeeMore}>
                    See All <LuArrowRight className="text-base" />
                </button>
            </div>

            <div className="mt-6">
                {transactions?.slice(0,5)?.map((item) => {
                    <TransactionInfoCard
                    key={item._id}
                    title={item.type == 'expense ' ?item.category:item.source}
                    icon = {item.icon}
                    date={moment(item.date).format("Do MMM YYYY")}
                    amount={item.amount}
                    type={item.type}
                    hideDeleteBtn
                    />
                })}
            </div>

            {/* Render transactions if available */}
            <ul className="mt-4 space-y-2">
                {transactions?.length > 0 ? (
                    transactions.map((tx, index) => (
                        <li key={index} className="text-sm text-gray-700">
                            {tx.description} - {tx.amount}
                        </li>
                    ))
                ) : (
                    <li className="text-sm text-gray-500">No transactions available.</li>
                )}
            </ul>
        </div>
    );
};

export default RecentTransactions;
