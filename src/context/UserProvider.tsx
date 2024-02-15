import { User } from 'firebase/auth';
import { PropsWithChildren, createContext, useState } from 'react';

type CurrentUser = User | null;

interface UserContextProps {
	user: CurrentUser;
	setUser: React.Dispatch<React.SetStateAction<CurrentUser>>;
}

const INITIAL_USER: User | null = null;

export const UserContext = createContext<UserContextProps | null>(null);

export const UserProvider = ({ children }: PropsWithChildren) => {
	const [user, setUser] = useState<CurrentUser>(INITIAL_USER);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
};
