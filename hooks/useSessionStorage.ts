import {
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useState,
} from 'react';

declare global {
    interface WindowEventMap {
        'session-storage': CustomEvent;
    }
}

type SetValue<T> = Dispatch<SetStateAction<T>>;

const IS_SERVER = typeof window === 'undefined';

export default function useSessionStorage<T>(
    key: string,
    initialValue: T,
): [T, SetValue<T>, () => void] {
    /* State to store the value */
    const [storedValue, setStoredValue] = useState<T>(initialValue);

    /**
     * Get from session storage then
     * parse stored json or return initialValue
     */
    const readValue = useCallback((): T => {
        /* Prevents build error "window is undefined" but keeps working */
        if (IS_SERVER) {
            return initialValue;
        }

        try {
            const item = window.sessionStorage.getItem(key);
            return item ? (parseJSON(item) as T) : initialValue;
        } catch (error) {
            console.warn(`Error reading sessionStorage key "${key}":`, error);
            return initialValue;
        }
    }, [initialValue, key]);

    /**
     * Sets the value in sessionStorage
     */
    const setValue: SetValue<T> = (value) => {
        /* Prevents build error "window is undefined" but keeps working */
        if (IS_SERVER) {
            console.warn(
                `Tried setting sessionStorage key "${key}" even though environment is not a client`,
            );
        }

        try {
            /* Allow value to be a function */
            const newValue =
                value instanceof Function ? value(storedValue) : value;
            /* Save to session storage */
            window.sessionStorage.setItem(key, JSON.stringify(newValue));
            /* Save state */
            setStoredValue(newValue);

            /* We dispatch a custom event so every useSessionStorage hook are notified */
            window.dispatchEvent(new Event('session-storage'));
        } catch (error) {
            console.warn(`Error setting sessionStorage key "${key}":`, error);
        }
    };

    /**
     * Removes the value from sessionStorage
     */
    const removeValue = () => {
        /* Prevent build error "window is undefined" but keeps working */
        if (IS_SERVER) {
            console.warn(
                `Tried removing sessionStorage key "${key}" even though environment is not a client`,
            );
        }

        const defaultValue =
            initialValue instanceof Function ? initialValue() : initialValue;

        /* Remove the key from session storage */
        window.sessionStorage.removeItem(key);

        /* Save state with default value */
        setStoredValue(defaultValue);

        /* We dispatch a custom event so every similar useSessionStorage hook is notified */
        window.dispatchEvent(new Event('session-storage'));
    };

    useEffect(() => {
        setStoredValue(readValue());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleStorageChange = useCallback(
        (event: StorageEvent | CustomEvent) => {
            if (
                (event as StorageEvent).key &&
                (event as StorageEvent).key !== key
            ) {
                return;
            }
            setStoredValue(readValue());
        },
        [key, readValue],
    );

    useEffect(() => {
        /* This is a custom event, triggered in writeValueToSessionStorage */
        window.addEventListener('session-storage', handleStorageChange);

        /* Remove event listeners on cleanup */
        return () => {
            window.removeEventListener('session-storage', handleStorageChange);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return [storedValue, setValue, removeValue];
}

/**
 * A wrapper for "JSON.parse()" to support "undefined" value
 */
function parseJSON<T>(value: string | null): T | undefined {
    try {
        return value === 'undefined' ? undefined : JSON.parse(value ?? '');
    } catch {
        console.log('parsing error on', { value });
        return undefined;
    }
}
