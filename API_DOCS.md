# API Integration Guide

Welcome to the API Integration Guide! This document explains how other developers can integrate their platforms with your website to retrieve event data.

## Base URL

All API requests should be made to:
`https://your-domain.com/api/v1`

## Authentication

The API is protected using an API Key. 

To authenticate, include the `x-api-key` header in all your requests:
```http
x-api-key: YOUR_DEVELOPER_API_KEY
```

**For the Website Owner:**
1. Generate a secure random string to use as an API key.
2. Add it to your `.env.local` and production environment variables as `DEVELOPER_API_KEY=your_secure_random_string`.
3. Share this key securely with the developers integrating with your platform.

## Endpoints

### 1. List Events

Retrieves a paginated list of events.

**Endpoint:** `GET /events`

**Query Parameters:**
- `limit` (optional): Number of records to return (default: 50)
- `offset` (optional): Number of records to skip (default: 0)

**Example Request:**
```bash
curl -X GET "https://your-domain.com/api/v1/events?limit=10&offset=0" \
     -H "x-api-key: YOUR_DEVELOPER_API_KEY"
```

**Successful Response (200 OK):**
```json
{
  "meta": {
    "total": 100,
    "limit": 10,
    "offset": 0
  },
  "data": [
    {
      "id": "uuid-of-event",
      "title": "Sample Event",
      "date": "2026-05-20T14:00:00Z",
      "created_at": "..."
    }
  ]
}
```

### 2. Get Single Event

Retrieves details for a specific event by its ID.

**Endpoint:** `GET /events/:id`

**Example Request:**
```bash
curl -X GET "https://your-domain.com/api/v1/events/123e4567-e89b-12d3-a456-426614174000" \
     -H "x-api-key: YOUR_DEVELOPER_API_KEY"
```

**Successful Response (200 OK):**
```json
{
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "title": "Sample Event",
    "date": "2026-05-20T14:00:00Z",
    "created_at": "..."
  }
}
```

**Error Responses:**
- `401 Unauthorized`: Missing API Key
- `403 Forbidden`: Invalid API Key
- `404 Not Found`: Event with the specified ID does not exist
- `500 Internal Server Error`: Database or server error
