export const label = (state) => {
  if (state.currentLang === "en") {
    return {
      page: {
        dashboard: "Dashboard",
        baseInfo: "Base information",
        operations: "Operations",
        reports: "Reports",
        companies: "Companies",
        brands: "Brands",
        products: "Products",
        invoices: "Invoices",
        reportByPackaging: "Report by packaging",
      },
      menu: {
        dashboard: "Dashboard",
        baseInfo: "Base information",
        operations: "Operations",
        reports: "Reports",
        companies: "Companies",
        brands: "Brands",
        products: "Products",
        invoices: "Invoices",
        reportByPackaging: "Report by packaging",
      },
      title: {
        wellcomeBack: "Wellcome Back",
        signIn: "Sign In",
      },
      slogan: {
        login: "Manage \n Your Invoice",
      },
      button: {
        account: "Account",
        signUp: "SignUp",
        logIn: "LogIn",
        logOut: "LogOut",
        dashboard: "Dashboard",
        closeSidebar: "Close sidebar",
        openSidebar: "Ppen sidebar",
        editProfile: "Edit profile",
      },
      form: {
        username: "Username",
        password: "Password",
      },
      caption: {
        detailToLogin: "Insert your detail to login to your account",
        notifMessage:
          "Notifications will be available in this section in a future update",
        username: "Username",
      },
    };
  } else {
    return {
      page: {
        dashboard: "داشبورد",
        baseInfo: "اطلاعات پایه",
        operations: "عملیات",
        reports: "گزارشات",
        companies: "شرکت ها",
        brands: "برند ها",
        products: "محصولات",
        invoices: "فاکتور ها",
        reportByPackaging: "گزارش بر اساس بسته بندی",
      },
      menu: {
        dashboard: "داشبورد",
        baseInfo: "اطلاعات پایه",
        operations: "عملیات",
        reports: "گزارشات",
        companies: "شرکت ها",
        brands: "برند ها",
        products: "محصولات",
        invoices: "فاکتور ها",
        reportByPackaging: "گزارش بر اساس بسته بندی",
      },
      title: {
        wellcomeBack: "خوش آمدید",
        signIn: "ورود به سیستم",
      },
      slogan: {
        login: "مدیریت \n فاکتور های خود",
      },
      button: {
        account: "حساب کاربری",
        signUp: "ثبت نام کنید",
        logIn: "ورود",
        logOut: "خروج",
        dashboard: "داشبورد",
        closeSidebar: "بستن ساید بار",
        openSidebar: "بازکردن ساید بار",
        editProfile: "ویرایش پروفایل",
      },
      form: {
        username: "نام کاربری",
        password: "رمز عبور",
      },
      caption: {
        detailToLogin:
          "لطفا اطلاعات خود برای وارد شدن به حساب کاربری خود را وارد کنید",
        notifMessage:
          "اعلان‌ها در به‌روزرسانی‌های آینده در این بخش نمایش داده خواهند شد",
        username: "نام کاربری",
      },
    };
  }
};
