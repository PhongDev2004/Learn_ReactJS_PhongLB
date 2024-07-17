import { createContext, useContext, ReactNode, useReducer } from "react";

type LoadingState = {
  loading: boolean;
};

type LoadingAction = {
  type: "SET_LOADING";
  payload: boolean;
};

type LoadingContextType = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

type LoadingProviderProps = {
  children: ReactNode;
};

const loadingReducer = (
  state: LoadingState,
  action: LoadingAction
): LoadingState => {
  switch (action.type) {
    case "SET_LOADING":
      return { loading: action.payload };
    default:
      return state;
  }
};

const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [state, dispatch] = useReducer(loadingReducer, { loading: false });

  const setLoading = (loading: boolean) => {
    dispatch({ type: "SET_LOADING", payload: loading });
  };

  return (
    <LoadingContext.Provider value={{ loading: state.loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};

export { LoadingProvider, useLoading };
