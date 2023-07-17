import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import memoryService from "./memoryService";

const initialState = {
  memories: [],
  image: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  res: {},
};

export const getAllMemories = createAsyncThunk(
  "memory/all-memories",
  async (thunkAPI) => {
    try {
      return await memoryService.getAllMemories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createAMemory = createAsyncThunk(
  "memory/create",
  async (data, thunkAPI) => {
    try {
      return await memoryService.createAMemory(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getMemory = createAsyncThunk(
  "memory/get",
  async (data, thunkAPI) => {
    try {
      return await memoryService.getMemory(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateMemory = createAsyncThunk(
  "memory/update",
  async (data, thunkAPI) => {
    try {
      return await memoryService.updateMemory(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteMemory = createAsyncThunk(
  "memory/delete",
  async (id, thunkAPI) => {
    try {
      return await memoryService.deleteMemory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteUploadedImage = createAsyncThunk(
  "memory/delete-uploaded-image",
  async (data, thunkAPI) => {
    try {
      return await memoryService.deleteUploadedImage(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const uploadImage = createAsyncThunk(
  "memory/upload-image",
  async (file, thunkAPI) => {
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "post-memories-project");
      data.append("cloud_name", "dkddmjgqj");
      data.append("folder", "post-memories-project");
      return await memoryService.uploadImage(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetImageState = createAction("reset/imageState");

const memorySlice = createSlice({
  name: "memory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllMemories.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAllMemories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.memories = action.payload.memories;
      state.res = action.payload.res;
    });
    builder.addCase(getAllMemories.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.memories = null;
      state.message = action.error;
      state.res = null;
    });

    builder.addCase(uploadImage.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(uploadImage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.image = action.payload;
      state.res = action.payload.res;
      console.log(state.image);
    });
    builder.addCase(uploadImage.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.error;
      state.res = null;
    });

    builder.addCase(deleteUploadedImage.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteUploadedImage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.image = null;
      state.res = action.payload.res;
      console.log(state.image);
    });
    builder.addCase(deleteUploadedImage.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.error;
      state.res = null;
    });

    builder.addCase(createAMemory.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createAMemory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.createdMemory = action.payload?.createdMemory;
      state.res = action.payload?.res;
       if (state.isSuccess && state.res?.success) {
         toast.success("Memory Created Successfully");
       }
    });
    builder.addCase(createAMemory.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.error;
      state.res = null;
       if (state.isError) {
         toast.error("Something Gone Wrong");
       }
    });

    builder.addCase(getMemory.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getMemory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.gotMemory = action.payload.gotMemory;
      state.res = action.payload.res;
    });
    builder.addCase(getMemory.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.error;
      state.res = null;
    });

    builder.addCase(updateMemory.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateMemory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.updatedMemory = action.payload?.updatedMemory;
      state.res = action.payload?.res;
      if (state.isSuccess) {
        toast.success("Memory Updated Successfully");
      }
    });
    builder.addCase(updateMemory.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.error;
      state.res = null;
      if (state.isError) {
        toast.error("Something Gone Wrong");
      }
    });

    builder.addCase(deleteMemory.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteMemory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.deletedMemory = action.payload.deletedMemory;
      state.res = action.payload.res;
      if (state.isSuccess) {
        toast.success("Memory Deleted Successfully");
      }
    });
    builder.addCase(deleteMemory.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.error;
      state.res = null;
      if (state.isError) {
        toast.error("Something Gone Wrong");
      }
    });

    builder.addCase(resetImageState, (state,action) => {
      state.image = null;
    } )
  },
});

export const memoryReducer = memorySlice.reducer;
