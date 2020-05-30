module.exports = {
    INVALID_REQUEST: 'Invalid Request',
    REQUIRED: 'Field is required',
    ALREADY_EXIST: 'Already Exist',
    CUSTOMER_NOT_FOUND: 'Customer not found',
    TRANSACTION_UNSUCCESSFUL: 'Transaction Unsuccessful',
    NOT_FOUND: 'Not Found',
    PAYMENT: 'Payemnt is invalid',
    HOUSE_FULL: 'House is Full',
    EVENT_EXPRIED: 'Event is Expired',
    COURSE_ID: 'Course Id is Invalid',
    PROFILE_IS_UNDER_REVIEW: 'Profile is under review',
    FEE_IS_PENDING: 'Fee is pending',
    FEE_NOT_PAID: 'Fee is not paid',
    PASSWORD_REQUIRED: 'Password is a required field.',
    NEW_PASSWORD_REQUIRED: 'New Password is a required field.',
    // CONFIRM_PASSWORD_REQUIRED: 'Confirm password is a required field.',
    ID_REQUIRED: 'Id is Required',
    EMAIL_REQUIRED: 'Email address is a required field.',
    FULL_NAME_REQUIRED: 'Full name is a required field.',
    NAME_REQUIRED: 'Name is a required field.',
    USERNAME_REQUIRED: 'Username is a required field.',
    USERNAME_OR_PASSWORD_INVALID: 'Username or Password is invalid',
    PASSWORD_INVALID: 'Password is invalid',
    OTP_REQUIRED: 'OTP is a required field.',
    USER_ID_REQUIRED: 'User Id is a required field',
    ID_INVALID: 'Id is invalid',
    LINK_INVALID: 'Link is invalid',
    STATUS_REQUIRED: 'Status is a required field',
    // USER_ID_REQUIRED: 'User id is a required field.',
    // RELATION_REQUIRED: 'Relation is a required field.',
    // BIRTH_DATE_REQUIRED: 'Birth date is a required field.',
    // GENDER_REQUIRED: 'Gender is a required field.',
    CONTACT_REQUIRED: 'Contact number is a required field.',
    CONTACT_INVALID: 'Contact number is not registered With Us',
    EMAIL_ALREADY_EXIST: 'Email address already exists.',
    CONTACT_ALREADY_EXIST: 'Contact number already exists.',
    COUPON_ALREADY_EXIST: 'Coupon already exists.',

    PASSWORD_RESET_TOKEN_REQUIRED: 'Password reset token is a required field.',
    PASSWORD_RESET_TOKEN_INVALID: 'Password reset token is invalid',
    PASSWORD_UPDATED_SUCCESSFULLY: 'Password has been updated Successfully',
    VERIFICATION_TOKEN_REQUIRED: 'Verification token is a required field',
    VERIFICATION_TOKEN_INVALID: 'Verification token is invalid',
    TOKEN_REQUIRED: 'Token is a required field',
    TOKEN_INVALID: 'Token is invalid',
    AUTHENTICATION_TOKEN_INVALID: 'Authentication token is invalid',
    AUTHENTICATION_TOKEN_REQUIRED: 'Authentication token is a required field',
    UNAUTHORIZED_ACCESS: 'You are not Authorized for this Operation',
    OTP_VIA_CONTACT_NUMBER: 'An OTP was sent to your contact number. Please check.',
    OTP_MISMATCH: 'Invalid otp. Please try again.',
    OTP_EXPIRED: 'OTP Expired. Please click on resend OTP.',
    OTP_NOT_VERIFIED: 'Please Verify OTP First.',
    CUSTOMER_INACTIVE: 'You are not allowed to Login currently . Please contact Admin for further details',
    STORE_INACTIVE: 'You are not allowed to Login currently . Please contact Admin for further details',

    CITY_ID_REQUIRED: 'City Id is a required field',
    CITY_ID_INVALID: 'City Id is Invalid',
    AREA_ID_REQUIRED: 'Area Id is a required field',
    AREA_ID_INVALID: 'Area Id is Invalid',
    ADDRESS_ID_REQUIRED: 'Address Id is a required field',
    ADDRESS_ID_INVALID: 'Address Id is invalid',

    //Product validation
    PRODUCT_PICTURE_REQUIRED: 'Product Picture is a required field',
    PRODUCT_SIZE_REQUIRED: 'Product Size is a required field',
    PRICE_GREATER_THAN_0: 'The price must be greater than 0.',
    PRICE_REQUIRED: 'The price is a required field.',
    STOCK_QUANTITY_NON_NEGATIVE: 'The stock quantity cannot be negative.',
    STOCK_QUANTITY_REQUIRED: 'The stock quantity is a required field.',
    PRODUCT_INACTIVE: 'Some of the products are Inactive',

    //store validation
    STORE_PICTURE_REQUIRED: 'Store Picture is a required field',
    STORE_DOESNT_SUPPORT_EXPRESS_DELIVERY: 'This Store Doesn\'t provide express delivery',
    OWNER_DETAILS_REQUIRED: 'Owner Details Are Required',
    ADDRESS_REQUIRED: 'Address Details Are Required',
    STORE_ADDRESS_ID_INVALID: 'Store Address Id is Invalid',
    TIMINGS_REQUIRED: 'Timing Details Are Required',
    STORE_ORDER_EXISTS_CANNOT_BE_DELETED: 'Above store cannot be deleted as order has already been placed from this store. Please disable it to avoid any further orders.',

    //category validation
    CATEGORY_PICTURE_REQUIRED: 'Category Picture is a required field',
    STORE_CATEGORY_MISMATCH: 'Store can only add/edit categories that are under it.',

    FCM_TOKEN_REQUIRED: 'Fcm token is a required field.',

    //cart Validation
    STORE_ID_REQUIRED: 'The Store Id is a required field',
    STORE_INACTIVE: 'The Store is not active . Please Contact Admin.',
    STORE_NAME_REQUIRED: 'The Store Name is a required field',
    STORE_ID_INVALID: 'The Store Id is invalid',
    QUANTITY_NON_NEGATIVE: 'The quantity cannot be negative.',
    QUANTITY_REQUIRED: 'The quantity is a required field.',
    COUNT_REQUIRED: 'The Count is a required field.',
    COUNT_GREATER_THAN_0: 'The Count must be greater than 0.',

    //order Validation
    TOTAL_AMOUNT_REQUIRED: 'Total amount is a required field.',
    TOTAL_AMOUNT_NON_NEGATIVE: 'Total amount cannot be negative.',
    DISCOUNT_NON_NEGATIVE: 'Discount cannot be negative.',
    PRODUCTS_REQUIRED: 'There should be atleast 1 Product while placing order',
    PRODUCT_ID_REQUIRED: 'Product Id is a required Field',
    SLOT_ID_REQUIRED: 'Slot Id is a required Field',
    SLOT_ID_INVALID: 'Slot Id is Invalid',
    SLOT_INACTIVE : 'Current Slot Is Unavailable',
    SLOT_FULL: 'Sorry Current Slot is Full. Please Select another Slot.',
    ORDER_ALREADY_ACCEPTED: 'This Order has already been accepted by other driver.',
    STORE_HASNT_ACCEPTED_ORDER: 'The store hasn\'t accepted the order yet',
    ORDER_ID_REQUIRED: 'The Order Id is a required field',
    ORDER_ID_INVALID: 'The Order Id is Invalid.',
    ORDER_CANNOT_BE_CANCELLED_AFTER_PICKUP: 'Order cannot be cancelled after it\'s been picked up by the driver.',
    ORDER_CANNOT_BE_CANCELLED_AFTER_DELIVERED: 'Order cannot be cancelled after it\'s been Delivered.',
    ORDER_CANNOT_BE_CANCELLED_AFTER_CANCELLED: 'Already Cancelled Order cannot be cancelled.',
    ORDER_CANNOT_BE_CANCELLED_NOW: 'The Order cannot be cancelled. Please Contact Customer Support.',
    ORDER_INVOICE_UNAVAILABLE: 'Invoice are only available for orders that are delivered.',

    IMAGE_REQUIRED: 'Image is a required ',

    //cart 
    STORE_ID_MISMATCH: 'Cart has entities from different store.',


    STREET_NAME_REQUIRED: 'Street name is a required field',
    HOUSE_NO_REQUIRED: 'House No. is a required field',
    ALIAS_REQUIRED: 'Alias is a required field',

    //coupon
    COUPON_VALUE_REQUIRED: 'Coupon Value is a required field',
    COUPON_VALUE_GREATER_THAN_0: 'Coupon Value must be greater than 0',
    COUPON_CODE_INVALID: 'Coupon Code is Not Valid',
    COUPON_INVALID: 'Coupon is Not Valid',
    COUPON_ID_INVALID: 'Coupon ID is Not Valid',
    COUPON_CODE_REQUIRED: 'Coupon Code is Required',
    COUPON_CODE_ALREADY_USED: 'Coupon can only be used once.',
    COUPON_ORDER_MIN_VALUE: 'Minumum Value must be greater than 0.',
    COUPON_ORDER_MIN_VALUE_REQUIRED: 'Minimum Order Amount Required.',
    CART_VALUE_REQUIRED: 'Total Cart Amount is Required.',

    FROM_DATE_REQUIRED: 'From Date is a Required Field',
    TO_DATE_REQUIRED: 'To Date is a Required Field',

    DRIVER_NOT_ONLINE: 'You have to online to do this operation.',

    //Delivery charges
    DELIVERY_ORDER_AMOUNT_REQUIRED: 'Delivery Order Amount is a required Field.',
    DELIVERY_CHARGES_REQUIRED: 'Delivery Charges is a required Field.',
    DELIVERY_ORDER_AMOUNT_GREATER_THAN_0: 'Delivery Order Amount must be greater than 0.',
    DELIVERY_CHARGES_GREATER_THAN_0: 'Delivery Charges must be greater than 0.',
    DELIVERY_ORDER_AMOUNT_ASCENDING_ORDER: 'Delivery Order Amount must be in ascending Order.',

    //Driver
    DRIVER_ID_REQUIRED: 'Driver Id is a required field',
    IS_ONLINE_REQUIRED: 'online status is required',

    // Admin Services
    SERVICE_NAME_REQUIRED: 'Service name is required field',
    SERVICE_NAME_EXIST: 'Service name is already exist',
    SERVICE_CATEGORY_NOT_ARRAY: 'Service category is not an array',
    SERVICE_CATEGORY_REQUIRED: 'Service category is required field',
    SERVICE_NOT_EXIST: 'Service is not exist.',
    DEGREE_NAME_REQUIRED: 'Degree name is required field',
    DEGREE_NAME_EXIST: 'Degree name is already Exist',
    ENGLISH_SUBJECT_EXIST: "English subject already exist.",
    ARABIC_SUBJECT_EXIST: "Arabic subject already exist.",
    DEGREE_NOT_EXIST: "Degree Does not Exist.",
    NO_ALPHABETS: "No alphabets are allowed in arabic name.",
    // NO_ALPHABETS: "No alphabets are allowed in arabic name.",



    // Freelancer
    SERVICE_TITLE_REQUIRED: 'Service title is required field',
    

    // Certificates
    CERTIFICATE_EXIST: 'Certificate already exist.',
    CERTIFICATE_NOT_EXIST: 'Certificate not exist.',
    ENGLISH_CATEGORY_EXIST: "English category already exist",
    ARABIC_CATEGORY_EXIST: "Arabic category already exist"




}