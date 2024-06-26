import {
    Dispatch,
    MutableRefObject,
    ReactNode,
    RefObject,
    SetStateAction,
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';
import { useRouter } from 'next/router';
import useScrollbar from '@/hooks/useScrollbar';
import useWindowSize from '@/hooks/useWindowSize';
import useLockedScroll from '@/hooks/useLockedScroll';

interface NavigationContextType {
    navigationRef: MutableRefObject<HTMLElement | null>;
    mobileNavRef: RefObject<HTMLDivElement>;
    open: boolean;
    sticky: boolean;
    hidden: boolean;
    toggle: () => void;
    currentRoute: string;
    setCurrentRoute: Dispatch<SetStateAction<string>>;
}

const NavigationContext = createContext<NavigationContextType>({
    navigationRef: {
        current: null,
    },
    mobileNavRef: {
        current: null,
    },
    open: false,
    sticky: false,
    hidden: false,
    toggle: () => {},
    currentRoute: '',
    setCurrentRoute: () => {},
});

export function NavigationContextProvider({
    children,
}: {
    children: ReactNode;
}) {
    const router = useRouter();
    const navigationRef = useRef<HTMLElement | null>(null);
    const mobileNavRef = useRef<HTMLDivElement | null>(null);
    const [open, setOpen] = useState(false);
    const [currentRoute, setCurrentRoute] = useState(router.asPath);
    const { scrollY, directionY } = useScrollbar();
    const { windowSize, isDesktop } = useWindowSize();
    const [locked, setLocked] = useLockedScroll(false);

    const toggle = () => {
        setOpen(!open);
        setLocked(!locked);
    };

    /* Closes navigation if viewport is larger than 1200px */
    useEffect(() => {
        if (isDesktop) {
            setOpen(false);
            setLocked(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDesktop]);

    /* Closes navigation on route change */
    useEffect(() => {
        if (open) {
            setOpen(false);
            setLocked(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.asPath]);

    const contextValue: NavigationContextType = {
        navigationRef,
        mobileNavRef,
        open,
        sticky: scrollY > 0,
        hidden:
            directionY > 0 &&
            typeof windowSize.height === 'number' &&
            scrollY > windowSize.height,
        toggle,
        currentRoute,
        setCurrentRoute,
    };

    return (
        <NavigationContext.Provider value={contextValue}>
            {children}
        </NavigationContext.Provider>
    );
}

export default function useNavigationContext(): NavigationContextType {
    return useContext(NavigationContext);
}
