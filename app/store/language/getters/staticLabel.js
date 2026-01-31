export const label = (state) => {
  if (state.currentLang === "en") {
    return {
      page: {
        home: "Home",
        aboutUs: "About Us",
        contactUs: "Contact Us",
      },
      menu: {
        home: "Home",
        aboutUs: "About Us",
        contactUs: "Contact Us",
      },
      title: {
        wellcomeBack: "Wellcome Back",
      },
      button: {
        account: "Account",
        logIn: "LogIn",
        dashboard: "Dashboard",
        logOut: "LogOut",
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
        home: "خانه",
        aboutUs: "درباره ما",
        contactUs: "ارتباط با ما",
      },
      menu: {
        home: "خانه",
        aboutUs: "درباره ما",
        contactUs: "ارتباط با ما",
      },
      title: {
        wellcomeBack: "خوش آمدید",
      },
      button: {
        account: "حساب کاربری",
        logIn: "ورود",
        dashboard: "داشبورد",
        logOut: "خروج",
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
