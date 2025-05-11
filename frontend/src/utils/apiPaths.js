export const BASE_URL = "http://localhost:5000";

// API paths
export const API_PATHS = {
    DASHBOARD: {
        GET_DATA: `${BASE_URL}/api/dashboard/dashboard`,
    },
    INCOME: {
        ADD_INCOME: `${BASE_URL}/api/income/add`,
        GET_ALL_INCOME: `${BASE_URL}/api/income/get`,
        DELETE_INCOME: (incomeId) => `${BASE_URL}/api/income/${incomeId}`,
        DOWNLOAD_INCOME: `${BASE_URL}/api/income/downloadexcel`,
    },
    EXPENSE: {
        ADD_EXPENSE: `${BASE_URL}/api/expense/add`,
        GET_ALL_EXPENSE: `${BASE_URL}/api/expense/get`,
        DELETE_EXPENSE: (expenseId) => `${BASE_URL}/api/expense/${expenseId}`,
        UPDATE_EXPENSE: (expenseId) => `${BASE_URL}/api/expense/${expenseId}`,
        DOWNLOAD_EXPENSE: `${BASE_URL}/api/expense/downloadexcel`,
    },
};
