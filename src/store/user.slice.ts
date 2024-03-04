import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadState } from "./storage";
import axios, { AxiosError } from "axios";
import { LoginResponse } from "../Pages/Login/Login.props";
import { PREFIX } from "../Helpers/Api";
import { userProfile } from "../interfaces/userProfile";
import { RootState } from "./store";

export const JWT_STATE = "userData";

export interface userPersistent {
  jwt: string | null;
}

export interface UserState {
  jwt: string | null;
  loginErrorMessage?: string;
  registerErrorMessage?: string;
  profile?: userProfile;
}

const initialState: UserState = {
  jwt: loadState<userPersistent>(JWT_STATE)?.jwt ?? null,
};

export const login = createAsyncThunk(
  "user/login",
  async (params: { email: string; password: string }) => {
    try {
      const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
        email: params.email,
        password: params.password,
      });
      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data.message);
      }
    }
  }
);

export const getProfile = createAsyncThunk<
  userProfile,
  void,
  { state: RootState }
>("user/getProfile", async (_, thunkApi) => {
  const jwt = thunkApi.getState().user.jwt;
  const { data } = await axios.get<userProfile>(`${PREFIX}/user/profile`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return data;
});

export const register = createAsyncThunk(
  "user/register",
  async (params: { email: string; password: string; name: string }) => {
    try {
      const { data } = await axios.post<LoginResponse>(
        `${PREFIX}/auth/register`,
        {
          email: params.email,
          password: params.password,
          name: params.name,
        }
      );
      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data.message);
      }
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addJwt: (state, action: PayloadAction<string>) => {
      state.jwt = action.payload;
    },
    clearLogin: (state) => {
      state.loginErrorMessage = undefined;
    },
    clearRegister: (state) => {
      state.registerErrorMessage = undefined;
    },
    logOut: (state) => {
      state.jwt = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      login.fulfilled,
      (state, action: PayloadAction<LoginResponse | undefined>) => {
        if (!action.payload) {
          return;
        }
        state.jwt = action.payload.access_token;
      }
    );
    builder.addCase(login.rejected, (state, action) => {
      state.loginErrorMessage = action.error.message;
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }
      state.jwt = action.payload.access_token;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.registerErrorMessage = action.error.message;
    });
  },
});

export const { addJwt, logOut, clearLogin, clearRegister } = userSlice.actions;
export default userSlice.reducer;
