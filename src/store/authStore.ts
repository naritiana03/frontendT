import create from "zustand";
import Cookies from "js-cookie";

type User = {
  fname: string;
  lname: string;
  email: string;
  phone: string;
  type: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (userData: User, token: string) => void;
  logout: () => void;
  loadAuthState: () => void;
};

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  login: (userData: User, token: string) => {
    set({
      user: userData,
      token: token,
      isAuthenticated: true,
    });
    Cookies.set(
      "auth",
      JSON.stringify({
        user: userData,
        token: token,
      }),
      { expires: 7 }
    );
  },

  logout: () => {
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
    Cookies.remove("auth");
  },

  loadAuthState: () => {
    const savedAuth = Cookies.get("auth");
    if (savedAuth) {
      const parsedAuth = JSON.parse(savedAuth) as { user: User; token: string };
      if (parsedAuth.token) {
        set({
          user: parsedAuth.user,
          token: parsedAuth.token,
          isAuthenticated: true,
        });
      }
    }
  },
}));

export default useAuthStore;
