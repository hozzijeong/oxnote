import { Navbar } from '@components/@common';
import { NAVBAR_PAGE, URL_PATH } from '@constants/path';
import { Suspense, useMemo } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './rootTemplate.module.scss';
import Spinner from '@components/@common/spinner';
import { auth } from '@fireStore/Firebase';
import { onAuthStateChanged } from 'firebase/auth';

const RootTemplate = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const navbar = useMemo(
		() => (NAVBAR_PAGE.includes(location.pathname) ? <Navbar /> : null),
		[location.pathname]
	);

	onAuthStateChanged(auth, (user) => {
		if (!user) {
			navigate(URL_PATH.LOGIN, { replace: true });
		}
	});

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
