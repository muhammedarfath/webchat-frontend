import { toast } from 'react-hot-toast';

export const showErrorToast = (message) => {
  toast.error(message);
};

export const showSuccessToast = (message) => {
    toast.success(message)
}

export const showPromiseToast = (promise, loading, success, error) => {
  toast.promise(
    promise,
    {
      loading: loading,
      success: <b>{success}</b>,
      error: <b>{error}</b>,
    }
  );
};