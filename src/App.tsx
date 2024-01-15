import { RouterProvider } from 'react-router-dom';
import router from './router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastProvider } from '@context/ToastProvider';
import { ToastList } from '@components/@common';

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ToastProvider>
				<RouterProvider router={router} />
				<ToastList />
			</ToastProvider>
		</QueryClientProvider>
	);
}

export default App;
