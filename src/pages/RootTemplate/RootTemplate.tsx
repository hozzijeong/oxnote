import { Navbar } from '@components/@common';
import { NAVBAR_PAGE, URL_PATH } from '@constants/path';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import styles from './rootTemplate.module.scss';
import Spinner from '@components/@common/spinner';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@fireStore/Firebase';
import useCurrentUser from '@hooks/auth/useCurrentUser';

const RootTemplate = () => {
	const location = useLocation();
	const { user, setUser } = useCurrentUser();

	const navbar = useMemo(
		() => (NAVBAR_PAGE.includes(location.pathname) ? <Navbar /> : null),
		[location.pathname]
	);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			setUser(user);

			setLoading(false);
		});
	}, []);

	if (loading) {
		return <Spinner />;
	}

	if (!loading && user === null) {
		return <Navigate to={URL_PATH.LOGIN} />;
	}

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
