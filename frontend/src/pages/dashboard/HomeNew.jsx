import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import DashboardLayout from "../../layouts/DashboardLayout"; // Ensure this is the correct path
import InfoCard from "../../components/InfoCard";

import {LuHandCoins, LuWalletMinimal} from "react-icons/lu";
import {IoMdCard} from "react-icons/io";
import { addThousandsSeparator } from "../../utils/helper";


const HomeNew = () => {
    const navigate = useNavigate();
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchDashboardData = async () => {
        if (loading) return;

        setLoading(true);

        try {
            const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);

            if (response.data) {
                setDashboardData(response.data);
            }
        } catch (error) {
            console.error("Something went wrong. Please try again.", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    return (
        <DashboardLayout activeMenu="Dashboard">
            <div className="my-5 mx-auto">
                {loading ? (
                    <p>Loading...</p>
                ) : dashboardData ? (
                    <pre>{JSON.stringify(dashboardData, null, 2)}</pre> // Display fetched data
                ) : (
                    <p>No data available.</p>
                )}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <InfoCard 
                        icon={<IoMdCard />}
                        label = "Total Balance"
                        value= {addThousandsSeparator(dashboardData?.totalBalance || 0)}
                        color = "bg-primary"
                    />

                    <InfoCard 
                        icon={<IoMdCard />}
                        label = "Total Income"
                        value= {addThousandsSeparator(dashboardData?.totalIncome || 0)}
                        color = "bg-orange-500"
                    />

                    <InfoCard 
                        icon={<IoMdCard />}
                        label = "Total Expense"
                        value= {addThousandsSeparator(dashboardData?.totalExpense || 0)}
                        color = "bg-red-500"
                    />
                </div>
            </div>
        </DashboardLayout>
    );
};

export default HomeNew;
