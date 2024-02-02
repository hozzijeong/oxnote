import { Navbar } from '@components/@common';
import { NAVBAR_PAGE, URL_PATH } from '@constants/path';
import { Suspense, useMemo } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import styles from './rootTemplate.module.scss';
import Spinner from '@components/@common/spinner';
import { getAuth } from 'firebase/auth';
import app from '@fireStore/Firebase';

const auth = getAuth(app);

// 새로고침시에 로그아웃이 되는데 이걸 어떻게 해야할까?
const RootTemplate = () => {
	const location = useLocation();

	const navbar = useMemo(
		() => (NAVBAR_PAGE.includes(location.pathname) ? <Navbar /> : null),
		[location.pathname]
	);

	if (auth.currentUser === null) {
		return <Navigate to={URL_PATH.AUTH} replace={true} />;
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
