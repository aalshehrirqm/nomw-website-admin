export const MESSAGES = {
  // Success messages
  SUCCESS: {
    CREATED: {
      ar: 'تم الإنشاء بنجاح',
      en: 'Created successfully',
    },
    UPDATED: {
      ar: 'تم التحديث بنجاح',
      en: 'Updated successfully',
    },
    DELETED: {
      ar: 'تم الحذف بنجاح',
      en: 'Deleted successfully',
    },
    RETRIEVED: {
      ar: 'تم الاسترجاع بنجاح',
      en: 'Retrieved successfully',
    },
  },

  // Error messages
  ERROR: {
    NOT_FOUND: {
      ar: 'العنصر غير موجود',
      en: 'Item not found',
    },
    UNAUTHORIZED: {
      ar: 'غير مصرح',
      en: 'Unauthorized',
    },
    FORBIDDEN: {
      ar: 'ممنوع الوصول',
      en: 'Forbidden',
    },
    BAD_REQUEST: {
      ar: 'طلب غير صحيح',
      en: 'Bad request',
    },
    INTERNAL_SERVER_ERROR: {
      ar: 'خطأ في الخادم',
      en: 'Internal server error',
    },
    VALIDATION_FAILED: {
      ar: 'فشل التحقق من البيانات',
      en: 'Validation failed',
    },
    DUPLICATE: {
      ar: 'العنصر موجود مسبقاً',
      en: 'Item already exists',
    },
  },

  // Auth messages
  AUTH: {
    LOGIN_SUCCESS: {
      ar: 'تم تسجيل الدخول بنجاح',
      en: 'Login successful',
    },
    LOGOUT_SUCCESS: {
      ar: 'تم تسجيل الخروج بنجاح',
      en: 'Logout successful',
    },
    INVALID_CREDENTIALS: {
      ar: 'بيانات الاعتماد غير صحيحة',
      en: 'Invalid credentials',
    },
    TOKEN_EXPIRED: {
      ar: 'انتهت صلاحية الرمز',
      en: 'Token expired',
    },
    TOKEN_INVALID: {
      ar: 'رمز غير صالح',
      en: 'Invalid token',
    },
    EMAIL_ALREADY_EXISTS: {
      ar: 'البريد الإلكتروني موجود مسبقاً',
      en: 'Email already exists',
    },
    ACCOUNT_DISABLED: {
      ar: 'الحساب معطل',
      en: 'Account disabled',
    },
  },
} as const;
