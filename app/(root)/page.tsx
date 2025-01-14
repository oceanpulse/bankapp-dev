import HeaderBox from '@/components/HeaderBox';
import RecentTransactions from '@/components/RecentTransactions';
import RightSidebar from '@/components/ui/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';

interface SearchParamProps {
    searchParams: {
        id?: string;
        page?: string;
    };
}

const Home = async ({ searchParams }: { searchParams: Promise<SearchParamProps['searchParams']> }) => {
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
        return <div>Please log in to view your account details.</div>;
    }

    // Fetch accounts for the logged-in user
    const accounts = await getAccounts({ userId: loggedIn.$id });
    if (!accounts) {
        return <div>No accounts available to display.</div>;
    }

    const accountsData = accounts.data || [];
    const appwriteItemId = id || accountsData[0]?.appwriteItemId || '';

    if (!appwriteItemId) {
        return <div>No accounts available to display.</div>;
    }

    // Fetch specific account details
    const account = await getAccount({ appwriteItemId });

    return (
        <section className="home">
            <div className="home-content">
                <header className="home-header">
                    <HeaderBox
                        type="greeting"
                        title="Welcome"
                        user={loggedIn?.firstName || 'Guest'}
                        subtext="Access and manage your account and transactions efficiently."
                    />

                    <TotalBalanceBox
                        accounts={accountsData}
                        totalBanks={accounts.totalBanks}
                        totalCurrentBalance={accounts.totalCurrentBalance}
                    />
                </header>

                <RecentTransactions
                    accounts={accountsData}
                    transactions={account?.transactions}
                    appwriteItemId={appwriteItemId}
                    page={currentPage}
                />
            </div>

            <RightSidebar
                user={loggedIn}
                transactions={account?.transactions}
                banks={accountsData.slice(0, 2)}
            />
        </section>
    );
};

export default Home;
