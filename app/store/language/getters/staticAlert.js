export const alert = (state) => {
  if (state.currentLang === "en") {
    return {
      success: {
        submit: "The form has been submitted successfully",
        login: "Welcome to FiNiK nuxt base dashboard",
      },
      error: {
        serverError: "server error",
        unknownPost: "unknown Post Error",
        accessDenied: "Access denied",
        unauthorized: "Please log in to access this page",
        requiredFields: "Please enter required fields",
      },
      warning: {},
      info: {},
    };
  } else {
    return {
      success: {
        submit: "اطلاعات مدنظر با موفقیت ثبت شد",
        login: "به داشبورد FiNiK خوش آمدید",
      },
      error: {
        serverError: "خطای سرور",
        unknownPost: "خطا ناشناخته در متد Post",
        accessDenied: "عدم دسترسی",
        unauthorized: "برای درسترسی به این صفحه لطفا دوباره logIn کنید",
        requiredFields: "لطفا فیلد های الزامی را وارد کنید",
      },
      warning: {},
      info: {},
    };
  }
};
