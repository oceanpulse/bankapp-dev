import HeaderBox from '@/components/HeaderBox';
import { Pagination } from '@/components/Pagination';
import TransactionsTable from '@/components/TransactionsTable';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { formatAmount } from '@/lib/utils';

interface SearchParamProps {
    searchParams: {
        id?: string;
        page?: string;
    };
}

const TransactionHistory = async ({ searchParams }: { searchParams: Promise<SearchParamProps['searchParams']> }) => {
    // Await searchParams to access its properties
    const params = await searchParams;

    // Use fallback values for searchParams
    const id = params.id || null;

    // Safely access `page`, ensuring it falls back to '1' if undefined
    const page = params.page || '1';
    const currentPage = Number(page);

    // Fetch logged-in user
    const loggedIn = await getLoggedInUser();
    if (!loggedIn) {
        return <div>Please log in to view your transaction history.</div>;
    }

    // Fetch accounts
    const accounts = await getAccounts({ userId: loggedIn.$id });
    if (!accounts || !accounts.data.length) {
        return <div>No accounts available to display.</div>;
    }

    const accountsData = accounts.data || [];
    const appwriteItemId = id || accountsData[0]?.appwriteItemId || '';

    if (!appwriteItemId) {
        return <div>No account details found to display.</div>;
    }

    // Fetch specific account details
    const account = await getAccount({ appwriteItemId });
    if (!account) {
        return <div>Unable to fetch account details.</div>;
    }

    // Paginate transactions
    const rowsPerPage = 10;
    const totalPages = Math.ceil(account.transactions.length / rowsPerPage);

    const indexOfLastTransaction = currentPage * rowsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;

    const currentTransactions = account.transactions.slice(
        indexOfFirstTransaction,
        indexOfLastTransaction
    );

    return (
        <div className="transactions">
            <div className="transactions-header">
                <HeaderBox
                    title="Transaction History"
                    subtext="See your bank details and transactions."
                />
            </div>

            <div className="space-y-6">
                <div className="transactions-account">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-18 font-bold text-white">{account.data.name}</h2>
                        <p className="text-14 text-blue-25">{account.data.officialName}</p>
                        <p className="text-14 font-semibold tracking-[1.1px] text-white">
                            ●●●● ●●●● ●●●● {account.data.mask}
                        </p>
                    </div>

                    <div className="transactions-account-balance">
                        <p className="text-14">Current balance</p>
                        <p className="text-24 text-center font-bold">{formatAmount(account.data.currentBalance)}</p>
                    </div>
                </div>

                <section className="flex w-full flex-col gap-6">
                    <TransactionsTable transactions={currentTransactions} />
                    {totalPages > 1 && (
                        <div className="my-4 w-full">
                            <Pagination totalPages={totalPages} page={currentPage} />
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default TransactionHistory;
