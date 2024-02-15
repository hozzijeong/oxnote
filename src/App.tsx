import { RouterProvider } from 'react-router-dom';
import router from './router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastProvider } from '@context/ToastProvider';
import { ToastList } from '@components/@common';
import { ConfirmProvider } from '@context/ConfirmProvider';
import Confirm from '@components/@common/confirm/Confirm';
import { UserProvider } from '@context/UserProvider';

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<UserProvider>
				<ConfirmProvider>
					<ToastProvider>
						<RouterProvider router={router} />
						<ToastList />
						<Confirm />
					</ToastProvider>
				</ConfirmProvider>
			</UserProvider>
		</QueryClientProvider>
	);
}

export default App;
