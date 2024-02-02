import { Navbar } from '@components/@common';
import { NAVBAR_PAGE } from '@constants/path';
import { Suspense, useMemo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styles from './rootTemplate.module.scss';
import Spinner from '@components/@common/spinner';
import { getAuth } from 'firebase/auth';
import app from '@fireStore/Firebase';

const auth = getAuth(app);

const RootTemplate = () => {
	const location = useLocation();

	const navbar = useMemo(
		() => (NAVBAR_PAGE.includes(location.pathname) ? <Navbar /> : null),
		[location.pathname]
	);

	console.log(auth.currentUser);

	return (
		<div className={styles.container}>
			<Suspense fallback={<Spinner />}>
				<Outlet />
			</Suspense>
			{navbar}
		</div>
	);
};

export default RootTemplate;
