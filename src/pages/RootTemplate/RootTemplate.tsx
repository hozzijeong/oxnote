import { Navbar } from '@components/@common';
import { NAVBAR_PAGE } from '@constants/path';
import { Suspense, useMemo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styles from './rootTemplate.module.scss';
import { QuizProvider } from 'src/context/QuizProvider';
import Spinner from '@components/@common/spinner';

const RootTemplate = () => {
	const location = useLocation();

	const navbar = useMemo(
		() => (NAVBAR_PAGE.includes(location.pathname) ? <Navbar /> : null),
		[location.pathname]
	);

	return (
		<QuizProvider>
			<div className={styles.container}>
				<Suspense fallback={<Spinner />}>
					<Outlet />
				</Suspense>
				{navbar}
			</div>
		</QuizProvider>
	);
};

export default RootTemplate;
