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
        manageCompanies: "Manage companies",
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
        createCompany: "Create company",
        edit: "Edit",
        delete: "Delete",
      },
      form: {
        username: "Username",
        password: "Password",
      },
      table: {
        individual: "Individual",
        legalEntity: "Legal entity",
        address: "Address",
        phone: "Phone",
      },
      description: {
        manageCompanies: "Manage the companies you use when creating invoices",
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
        manageCompanies: "مدیریت شرکت ها",
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
        createCompany: "ایجاد شرکت",
        edit: "ویرایش",
        delete: "حذف",
      },
      form: {
        username: "نام کاربری",
        password: "رمز عبور",
      },
      table: {
        individual: "حقیقی",
        legalEntity: "حقوقی",
        address: "نشانی",
        phone: "شماره تماس",
      },
      description: {
        manageCompanies:
          "شرکت‌هایی را که هنگام ایجاد فاکتورها استفاده می‌کنید، مدیریت کنید",
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
