# 健康饮食助手 API 文档

## 基础信息

- 基础URL: `https://mcragtiiddbt.sealoshzh.site/`
- 所有请求头都需要包含: `Content-Type: application/json`
- 认证请求头: `Authorization: Bearer {token}` (登录后获取的token)

## 通用响应格式

### 成功响应
```json
{
    "code": 200,
    "data": {
        // 具体的数据
    },
    "message": "操作成功"
}
```

### 错误响应
```json
{
    "code": 400/401/403/404/500,
    "message": "错误信息"
}
```

### 错误码说明
- 200: 成功
- 400: 请求参数错误
- 401: 未认证或认证失败
- 403: 无权限
- 404: 资源不存在
- 500: 服务器内部错误

## 1. 用户认证相关接口

### 1.1 用户注册
- **接口**: `/auth/register/`
- **方法**: POST
- **认证**: 不需要
- **请求体**:
```json
{
    "username": "string",
    "password": "string",
    "email": "string"
}
```
- **成功响应** (200):
```json
{
    "code": 200,
    "data": {
        "userId": "string",
        "username": "string"
    },
    "message": "注册成功"
}
```
- **失败响应**:
  - 400 (参数错误):
  ```json
  {
      "code": 400,
      "message": "请提供用户名、密码和邮箱"
  }
  ```
  - 400 (用户已存在):
  ```json
  {
      "code": 400,
      "message": "用户名已存在"
  }
  ```

### 1.2 用户登录
- **接口**: `/auth/login/`
- **方法**: POST
- **认证**: 不需要
- **请求体**:
```json
{
    "username": "string",
    "password": "string"
}
```
- **成功响应** (200):
```json
{
    "code": 200,
    "data": {
        "token": "string",
        "userId": "string",
        "username": "string"
    },
    "message": "登录成功"
}
```
- **失败响应**:
  - 400 (参数错误):
  ```json
  {
      "code": 400,
      "message": "请提供用户名和密码"
  }
  ```
  - 401 (认证失败):
  ```json
  {
      "code": 401,
      "message": "用户名或密码错误"
  }
  ```

## 2. 用户信息相关接口

### 2.1 获取用户信息
- **接口**: `/user/`
- **方法**: GET
- **认证**: 需要
- **成功响应** (200):
```json
{
    "code": 200,
    "data": {
        "username": "string",
        "email": "string",
        "height": number,
        "weight": number,
        "age": number,
        "gender": "string",
        "avatar": "string",
        "bmi": number,
        "dietary_preferences": ["string"],
        "allergies": ["string"]
    }
}
```
- **失败响应**:
  - 401 (未认证):
  ```json
  {
      "code": 401,
      "message": "认证失败"
  }
  ```

### 2.2 更新用户信息
- **接口**: `/user/`
- **方法**: PUT
- **认证**: 需要
- **请求体**:
```json
{
    "height": number,
    "weight": number,
    "age": number,
    "gender": "string",
    "dietary_preferences": ["string"],
    "allergies": ["string"]
}
```
- **成功响应** (200):
```json
{
    "code": 200,
    "data": {
        "userId": "string",
        "bmi": number,
        "message": "更新成功"
    }
}
```
- **失败响应**:
  - 400 (参数错误):
  ```json
  {
      "code": 400,
      "message": "参数验证失败",
      "errors": {
          "field": ["错误信息"]
      }
  }
  ```

## 3. 食物识别相关接口

### 3.1 食物图片识别
- **接口**: `/food/recognize/`
- **方法**: POST
- **认证**: 需要
- **请求体**: FormData格式
  - `image`: File (图片文件)
- **成功响应** (200):
```json
{
    "code": 200,
    "data": {
        "results": [
            {
                "name": "string",
                "confidence": number,
                "image": "string"
            }
        ]
    }
}
```
- **失败响应**:
  - 400 (参数错误):
  ```json
  {
      "code": 400,
      "message": "请上传图片"
  }
  ```

### 3.2 获取食物营养信息
- **接口**: `/food/analysis/`
- **方法**: GET
- **认证**: 需要
- **参数**:
  - `foodName`: string (查询参数)
- **成功响应** (200):
```json
{
    "code": 200,
    "data": {
        "name": "string",
        "image": "string",
        "nutrition": [
            {
                "name": "string",
                "amount": "string",
                "unit": "string",
                "per100g": "string",
                "calories": "string"
            }
        ],
        "totalCalories": number,
        "healthAdvice": "string",
        "bmiWarning": "string"
    }
}
```
- **失败响应**:
  - 400 (参数错误):
  ```json
  {
      "code": 400,
      "message": "请提供食物名称"
  }
  ```
  - 404 (未找到):
  ```json
  {
      "code": 404,
      "message": "未找到该食物"
  }
  ```

## 4. AI助手相关接口

### 4.1 发送消息
- **接口**: `/ai/chat/`
- **方法**: POST
- **认证**: 需要
- **请求体**:
```json
{
    "message": "string",
    "context": ["string"] // 可选，之前的对话历史
}
```
- **成功响应** (200):
```json
{
    "code": 200,
    "data": {
        "reply": "string",
        "suggestions": ["string"]
    }
}
```
- **失败响应**:
  - 400 (参数错误):
  ```json
  {
      "code": 400,
      "message": "请提供消息内容"
  }
  ```

## 5. 推荐系统相关接口

### 5.1 获取食物推荐
- **接口**: `/food/`
- **方法**: GET
- **认证**: 需要
- **参数**:
  - `category`: string (可选，食物分类)
  - `page`: number (页码，默认1)
  - `pageSize`: number (每页数量，默认10)
- **成功响应** (200):
```json
{
    "code": 200,
    "data": {
        "items": [
            {
                "id": "string",
                "name": "string",
                "image": "string",
                "calories": number,
                "category": "string",
                "tags": ["string"]
            }
        ],
        "total": number,
        "page": number,
        "pageSize": number
    }
}
```

### 5.2 获取食物分类
- **接口**: `/recommendations/categories/`
- **方法**: GET
- **认证**: 需要
- **成功响应** (200):
```json
{
    "code": 200,
    "data": {
        "categories": [
            {
                "id": "string",
                "name": "string",
                "icon": "string"
            }
        ]
    }
}
```

## 文件上传说明

对于需要上传文件的接口（如上传头像、食物图片等），请使用 `multipart/form-data` 格式，并在请求头中设置：
```
Content-Type: multipart/form-data
```

## 注意事项

1. 所有需要认证的接口都必须在请求头中包含有效的 JWT token：
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

2. 分页接口的响应中都包含以下信息：
   - `total`: 总记录数
   - `page`: 当前页码
   - `pageSize`: 每页记录数

3. 图片 URL 都是相对路径，需要在前端拼接完整的域名。

4. 所有的时间字段都使用 ISO 8601 格式：`YYYY-MM-DDTHH:mm:ss.sssZ`

5. 错误处理：所有接口在发生错误时都会返回统一格式的错误响应，包含错误码和错误信息。 