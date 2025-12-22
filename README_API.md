# 📚 Nomw Capital CMS API Documentation

## 🌐 Base URL
```
http://localhost:3000/api/v1
```

## 🔐 Authentication
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <your_access_token>
```

---

## 📋 API Endpoints

### **1. Hero Sections**

#### Get All Hero Sections
```http
GET /api/v1/hero-sections
```

#### Get Active Hero Sections
```http
GET /api/v1/hero-sections/active
```

#### Get Hero Section by ID
```http
GET /api/v1/hero-sections/:id
```

#### Create Hero Section (Protected)
```http
POST /api/v1/hero-sections
Authorization: Bearer <token>
Roles: admin, content_manager

Body:
{
  "title": {
    "ar": "عنوان البطل",
    "en": "Hero Title"
  },
  "subtitle": {
    "ar": "عنوان فرعي",
    "en": "Subtitle"
  },
  "ctaText": {
    "ar": "ابدأ الآن",
    "en": "Get Started"
  },
  "ctaLink": "/contact",
  "scrollDownText": {
    "ar": "انتقل للأسفل",
    "en": "Scroll Down"
  },
  "backgroundImage": "/images/hero-bg.jpg",
  "isActive": true,
  "order": 1
}
```

#### Update Hero Section (Protected)
```http
PATCH /api/v1/hero-sections/:id
Authorization: Bearer <token>
Roles: admin, content_manager
```

#### Toggle Active (Protected)
```http
PATCH /api/v1/hero-sections/:id/toggle-active
Authorization: Bearer <token>
Roles: admin, content_manager
```

#### Delete Hero Section (Protected)
```http
DELETE /api/v1/hero-sections/:id
Authorization: Bearer <token>
Roles: admin
```

---

### **2. CEO Words**

#### Get All CEO Words
```http
GET /api/v1/ceo-words
```

#### Get Active CEO Words
```http
GET /api/v1/ceo-words/active
```

#### Create CEO Words (Protected)
```http
POST /api/v1/ceo-words
Authorization: Bearer <token>
Roles: admin, content_manager

Body:
{
  "name": {
    "ar": "تركي بن عبدالعزيز",
    "en": "Turki bin Abdulaziz"
  },
  "position": {
    "ar": "الرئيس التنفيذي",
    "en": "Chief Executive Officer"
  },
  "message": {
    "ar": "رسالة الرئيس التنفيذي...",
    "en": "CEO Message..."
  },
  "image": "/images/ceo.jpg",
  "isActive": true
}
```

---

### **3. Vision**

#### Get All Vision
```http
GET /api/v1/vision
```

#### Get Active Vision
```http
GET /api/v1/vision/active
```

#### Create Vision (Protected)
```http
POST /api/v1/vision
Authorization: Bearer <token>
Roles: admin, content_manager

Body:
{
  "title": {
    "ar": "رؤيتنا",
    "en": "Our Vision"
  },
  "description": {
    "ar": "وصف الرؤية",
    "en": "Vision description"
  },
  "items": [
    {
      "icon": "icon-name",
      "title": {
        "ar": "عنصر الرؤية",
        "en": "Vision Item"
      },
      "description": {
        "ar": "وصف العنصر",
        "en": "Item description"
      }
    }
  ],
  "isActive": true
}
```

---

### **4. Services**

#### Get All Services
```http
GET /api/v1/services
```

#### Get Active Services
```http
GET /api/v1/services/active
```

#### Get Services by Category
```http
GET /api/v1/services?category=asset_management
```

**Available Categories:**
- `asset_management`
- `real_estate`
- `private_equity`
- `money_markets`
- `corporate_finance`
- `arrangement_services`

#### Create Service (Protected)
```http
POST /api/v1/services
Authorization: Bearer <token>
Roles: admin, content_manager

Body:
{
  "name": {
    "ar": "إدارة الأصول",
    "en": "Asset Management"
  },
  "description": {
    "ar": "وصف الخدمة",
    "en": "Service description"
  },
  "icon": "icon-name",
  "category": "asset_management",
  "details": {
    "types": [
      {
        "ar": "صناديق العقارات",
        "en": "Real Estate Funds"
      }
    ],
    "items": [
      {
        "ar": "عنصر 1",
        "en": "Item 1"
      }
    ]
  },
  "order": 1,
  "isActive": true
}
```

---

## 🔑 User Roles

- **admin**: Full access to all endpoints including delete operations
- **content_manager**: Can create, read, and update content
- **editor**: Read-only access to content

---

## 📦 Response Format

### Success Response
```json
{
  "statusCode": 200,
  "data": { ... },
  "message": "Success"
}
```

### Error Response
```json
{
  "statusCode": 400,
  "message": "Error message",
  "error": "Bad Request"
}
```

---

## 🚀 Getting Started

### 1. Import Postman Collection
Import the `postman_collection.json` file into Postman.

### 2. Set Environment Variables
- `base_url`: http://localhost:3000
- `api_version`: v1
- `access_token`: Your JWT token

### 3. Login
Use the Authentication > Login endpoint to get your access token.

### 4. Start Testing
All endpoints are ready to use!

---

## 📝 Notes

- All dates are in ISO 8601 format
- All text fields support Arabic and English
- File uploads use multipart/form-data
- Maximum file size: 10MB
- Supported image formats: JPG, PNG, WebP, SVG

---

## 🔄 API Versioning

The API uses URI versioning:
- Current version: `v1`
- Base path: `/api/v1`

Future versions will be available at `/api/v2`, etc.
