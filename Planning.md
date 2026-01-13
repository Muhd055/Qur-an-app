
# Qur'an Companion App - Planning Document

## Table of Contents
1. [Vision & Mission](#vision--mission)
2. [Product Strategy](#product-strategy)
3. [System Architecture](#system-architecture)
4. [Technology Stack](#technology-stack)
5. [Development Tools & Environment](#development-tools--environment)
6. [Team Structure & Roles](#team-structure--roles)
7. [Development Workflow](#development-workflow)
8. [Infrastructure & DevOps](#infrastructure--devops)
9. [Security & Compliance](#security--compliance)
10. [Testing Strategy](#testing-strategy)

11. [Deployment Strategy](#deployment-strategy)
12. [Monitoring & Maintenance](#monitoring--maintenance)

---

## 1. Vision & Mission

### Vision Statement
To create a "Social Spiritual Ecosystem" that transforms Qur'an engagement from a solitary activity into a consistent, gamified, and community-driven habit — acting as the "Duolingo for Qur'an Reading."

### Mission Statement
We empower Muslims to build a lifelong relationship with the Qur'an by:
- **Visualizing the Invisible Reward**: Digitizing *Hasanat* (10 rewards per letter) as real-time feedback.
- **Fostering Righteous Competition**: Creating social layers (leaderboards, groups) for community accountability.
- **Enforcing Focus**: Providing the "Deep Deen" Focus Mode to protect spiritual time from distractions.
- **Celebrating Consistency**: Moving the focus from perfection to daily adherence through streaks and gamification.

### Core Values

**1. Ikhlas (Sincerity)**
- Build features that genuinely serve users' spiritual growth
- Avoid manipulative engagement tactics
- Prioritize user wellbeing over metrics

**2. Simplicity (Basit)**
- Remove friction from Qur'an engagement
- Clear, intuitive interfaces

- Essential features done excellently

**3. Community (Ummah)**
- Foster genuine Islamic brotherhood/sisterhood
- Encourage mutual support and encouragement
- Create safe, respectful spaces

**4. Excellence (Ihsan)**
- High-quality implementation
- Attention to detail
- Continuous improvement

**5. Accessibility (Taysir)**
- Available to all Muslims regardless of technical skill
- Respectful of data limits and device capabilities
- Inclusive of different learning styles and abilities


---

## 2. Product Strategy

### Target Audience

**Primary Users:**
- Young adults (18-35) who want to build Qur'an habits
- Muslims seeking community accountability
- Tech-savvy Muslims comfortable with apps
- People preparing for Ramadan

**Secondary Users:**
- Muslim families wanting to track together
- Islamic study groups and circles
- Masjid communities organizing challenges

- Muslim students and professionals

### User Personas

**Persona 1: Ahmed - The Consistent Striver**
- Age: 27, Software Engineer
- Goal: Read Qur'an daily, maintain streaks
- Pain: Lacks motivation, forgets to read
- Needs: Reminders, progress tracking, accountability

**Persona 2: Fatima - The Community Seeker**
- Age: 23, University Student
- Goal: Connect with sisters, increase Qur'an
- Pain: Feels isolated in faith practice
- Needs: Groups, supportive community, competitions

**Persona 3: Omar - The Ramadan Maximizer**
- Age: 32, Business Owner
- Goal: Complete Qur'an in Ramadan
- Pain: Struggles with consistency after Ramadan
- Needs: Goal setting, progress tracking, post-Ramadan support

### Competitive Analysis

**Direct Competitors:**
- Quran.com - Strong reading experience, limited social
- Muslim Pro - Feature-rich, cluttered interface
- Tarteel - AI recitation focus, less community
- Bayyinah TV - Educational focus, subscription model

**Our Differentiation:**
- ✅ Community-first approach with groups & competitions
- ✅ Simplicity and focus on daily habits
- ✅ Respectful, non-addictive engagement
- ✅ Brotherhood/sisterhood emphasis
- ✅ Free, accessible to all

**Indirect Competitors:**
- Habit tracking apps (Streaks, Habitica)
- Fitness apps with social features (Strava, Peloton)
- Productivity apps (Forest, Focus@Will)

**Learning from competitors:**
- Social accountability works (Strava model)
- Simplicity wins (Streak's focused approach)
- Community creates retention (Peloton's model)


---

## 3. System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────┐         ┌──────────────────┐         │
│  │   Flutter iOS    │         │  Flutter Android │         │

│  │                  │         │                  │         │
│  │  • UI Components │         │  • UI Components │         │
│  │  • State Mgmt    │         │  • State Mgmt    │         │
│  │  • Local Storage │         │  • Local Storage │         │
│  │  • Audio Player  │         │  • Audio Player  │         │
│  └────────┬─────────┘         └────────┬─────────┘         │
│           │                            │                    │
└───────────┼────────────────────────────┼────────────────────┘
            │                            │
            │    HTTPS/WSS              │
            └────────────┬───────────────┘
                         │

┌────────────────────────▼────────────────────────────────────┐
│                   API GATEWAY / LOAD BALANCER                │
│                        (Nginx/AWS ALB)                        │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│                   APPLICATION LAYER                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  

┌────────────────────────────────────────────────┐         │
│  │         FastAPI Application Servers            │         │
│  │                                                 │         │
│  │  ┌─────────────┐  ┌──────────────┐            │         │
│  │  │   REST API  │  │   WebSocket  │            │         │
│  │  │  Endpoints  │  │    Server    │            │         │
│  │  └─────────────┘  └──────────────┘            │         │
│  │                                                 │         │
│  │  ┌─────────────────────────────────────┐      │         │
│  │  │       Business Logic Layer          │      │         │
│  │  │                                      │      │         │
│  │  │  • Authentication & Authorization    │      │         │
│  │  │  • Qur'an Management Service         │      │         │
│  │  │  • Hasanat & Progress Service        │      │         │
│  │  │  • Daily Deen Feed Service           │      │         │
│  │  │  • Focus Mode (Deep Deen) Service    │      │         │
│  │  │  • Group & Halaqah Service           │      │         │
│  │  │  • Competition Service               │      │         │
│  │  │  • Chat Service                      │      │         │
│  │  │  • Notification Service              │      │         │
│  │  │  • Dhikr & Calendar Service          │      │         │
│  │  └─────────────────────────────────────┘      │         │
│  └────────────────────────────────────────────────┘         │

│                                                              │
└────────────────────────┬────────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
┌───────▼────────┐  ┌───▼──────┐  ┌─────▼──────────┐
│   PostgreSQL   │  │  Redis   │  │  Object Storage│
│                │  │          │  │   (S3/R2)      │
│ • Users        │  │ • Cache  │  │                │
│ • Sessions     │  │ • Chat   │  │ • Qur'an Audio │
│ • Groups       │  │ • Queue  │  │ • Avatars      │
│ • Messages     │  │ • Leader │  │ • 

Assets       │
│ • Progress     │  │   boards │  │                │
└────────────────┘  └──────────┘  └────────────────┘
        │
        │
┌───────▼────────────────────────────────────────────┐
│              EXTERNAL SERVICES                      │
├────────────────────────────────────────────────────┤
│                                                     │
│  ┌──────────────┐      ┌──────────────┐           │
│  │   Firebase   │      │   Sentry     │           │
│  │     FCM      │      │   (Errors)   │           │
│  └──────────────┘      

└──────────────┘           │
│                                                     │
│  ┌──────────────┐      ┌──────────────┐           │
│  │   CloudFlare │      │   Analytics  │           │
│  │     CDN      │      │   Service    │           │
│  └──────────────┘      └──────────────┘           │
│                                                     │
└────────────────────────────────────────────────────┘
```

### Architecture Patterns

**1. Layered Architecture**
- **Presentation Layer:** Flutter UI
- **Application Layer:** FastAPI services
- **Business Logic Layer:** Domain services

- **Data Layer:** PostgreSQL, Redis, S3

**2. Microservices-Ready Monolith**
- Start with monolithic FastAPI app
- Modular service design
- Easy to split into microservices later

**3. Event-Driven Components**
- Real-time chat via WebSockets
- Push notifications via message queue
- Async background tasks (Celery optional)

**4. Caching Strategy**
- Redis for hot data (leaderboards, session data)
- Application-level caching
- CDN for static assets

---

### Database Schema Design


```sql
-- Users and Authentication
users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(20) UNIQUE,
  password_hash VARCHAR(255),
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  last_login TIMESTAMP,
  is_active BOOLEAN,
  is_verified BOOLEAN
)

profiles (
  user_id UUID PRIMARY KEY REFERENCES users(id),
  username VARCHAR(50) UNIQUE,
  display_name VARCHAR(100),
  avatar_url VARCHAR(500),

  bio TEXT,
  gender VARCHAR(20),
  timezone VARCHAR(50),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)

-- Qur'an Progress
reading_sessions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  start_time TIMESTAMP,
  end_time TIMESTAMP,
  duration_seconds INTEGER,
  surah_number INTEGER,
  juz_number INTEGER,
  start_ayah INTEGER,
  end_ayah INTEGER,
  pages_read INTEGER,
  ayahs_read INTEGER,
  session_type VARCHAR(20), -- 'reading', 

'listening', 'memorizing'
  created_at TIMESTAMP
)

user_progress (
  user_id UUID PRIMARY KEY REFERENCES users(id),
  total_sessions INTEGER DEFAULT 0,
  total_minutes INTEGER DEFAULT 0,
  total_ayahs INTEGER DEFAULT 0,
  total_pages INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_read_date DATE,
  quran_completion_percent DECIMAL(5,2),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)

bookmarks (
  id UUID PRIMARY KEY,

  user_id UUID REFERENCES users(id),
  surah_number INTEGER,
  ayah_number INTEGER,
  created_at TIMESTAMP
)

-- Goals
user_goals (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  goal_type VARCHAR(20), -- 'daily', 'weekly', 'monthly'
  metric_type VARCHAR(20), -- 'pages', 'ayahs', 'minutes'
  target_value INTEGER,
  is_active BOOLEAN,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)

-- Groups

groups (
  id UUID PRIMARY KEY,
  name VARCHAR(100),
  description TEXT,
  creator_id UUID REFERENCES users(id),
  avatar_url VARCHAR(500),
  privacy VARCHAR(20), -- 'public', 'private'
  member_limit INTEGER,
  member_count INTEGER DEFAULT 0,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)

group_members (
  id UUID PRIMARY KEY,
  group_id UUID REFERENCES groups(id),
  user_id UUID REFERENCES users(id),
  role VARCHAR(20), -- 'admin', 'member'
  joined_at TIMESTAMP,
  UNIQUE(group_id, user_id)
)


group_activity (
  id UUID PRIMARY KEY,
  group_id UUID REFERENCES groups(id),
  user_id UUID REFERENCES users(id),
  activity_type VARCHAR(50), -- 'member_joined', 'milestone', 'post'
  content TEXT,
  created_at TIMESTAMP
)

-- Competitions
competitions (
  id UUID PRIMARY KEY,
  name VARCHAR(100),
  description TEXT,
  creator_id UUID REFERENCES users(id),
  competition_type VARCHAR(20), -- 'public', 'private', 'group'
  group_id UUID REFERENCES groups(id) NULL,

  metric_type VARCHAR(20), -- 'pages', 'ayahs', 'minutes'
  start_date TIMESTAMP,
  end_date TIMESTAMP,
  status VARCHAR(20), -- 'upcoming', 'active', 'completed'
  participant_count INTEGER DEFAULT 0,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)

competition_participants (
  id UUID PRIMARY KEY,
  competition_id UUID REFERENCES competitions(id),
  user_id UUID REFERENCES users(id),
  total_progress INTEGER DEFAULT 0,
  rank INTEGER,
  joined_at TIMESTAMP,
  UNIQUE(competition_id, user_id)
)


-- Chat
conversations (
  id UUID PRIMARY KEY,
  conversation_type VARCHAR(20), -- 'direct', 'group'
  group_id UUID REFERENCES groups(id) NULL,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)

conversation_participants (
  id UUID PRIMARY KEY,
  conversation_id UUID REFERENCES conversations(id),
  user_id UUID REFERENCES users(id),
  joined_at TIMESTAMP,
  last_read_at TIMESTAMP,
  UNIQUE(conversation_id, user_id)
)


messages (
  id UUID PRIMARY KEY,
  conversation_id UUID REFERENCES conversations(id),
  sender_id UUID REFERENCES users(id),
  content TEXT,
  message_type VARCHAR(20), -- 'text', 'system'
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  is_deleted BOOLEAN DEFAULT FALSE
)

message_reactions (
  id UUID PRIMARY KEY,
  message_id UUID REFERENCES messages(id),
  user_id UUID REFERENCES users(id),
  reaction_type VARCHAR(20), -- 'heart', 'thumbs_up'

  created_at TIMESTAMP,
  UNIQUE(message_id, user_id, reaction_type)
)

-- Notifications
notifications (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  notification_type VARCHAR(50),
  title VARCHAR(255),
  body TEXT,
  data JSONB,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP
)

user_notification_settings (
  user_id UUID PRIMARY KEY REFERENCES users(id),
  daily_reminder_enabled BOOLEAN 

DEFAULT TRUE,
  daily_reminder_time TIME,
  competition_alerts BOOLEAN DEFAULT TRUE,
  group_messages BOOLEAN DEFAULT TRUE,
  streak_reminders BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)

-- Achievements
achievements (
  id UUID PRIMARY KEY,
  name VARCHAR(100),
  description TEXT,
  icon_url VARCHAR(500),
  category VARCHAR(50),
  criteria JSONB,
  created_at TIMESTAMP

)

user_achievements (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  achievement_id UUID REFERENCES achievements(id),
  earned_at TIMESTAMP,
  UNIQUE(user_id, achievement_id)
)

-- Indexes for performance
CREATE INDEX idx_reading_sessions_user_id ON reading_sessions(user_id);
CREATE INDEX idx_reading_sessions_created_at ON reading_sessions(created_at);
CREATE INDEX idx_messages_conversation_id ON messages(conversation_id);

CREATE INDEX idx_messages_created_at ON messages(created_at);
CREATE INDEX idx_competition_participants_competition_id ON competition_participants(competition_id);
CREATE INDEX idx_group_members_group_id ON group_members(group_id);
CREATE INDEX idx_group_members_user_id ON group_members(user_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
```

---

### API Architecture

**REST API Endpoints Structure:**


```
/api/v1/
├── auth/
│   ├── POST /register
│   ├── POST /login
│   ├── POST /logout
│   ├── POST /refresh-token
│   └── POST /verify-email
│
├── users/
│   ├── GET /me
│   ├── PUT /me
│   ├── GET /{user_id}
│   └── GET /{user_id}/stats
│
├── quran/
│   ├── GET /surahs
│   ├── GET /surahs/{number}
│   ├── GET /juz/{number}
│   ├── GET /ayah/{surah}/{ayah}

│   └── GET /reciters
│
├── progress/
│   ├── GET /sessions
│   ├── POST /sessions
│   ├── GET /stats
│   ├── GET /streak
│   └── POST /bookmark
│
├── goals/
│   ├── GET /
│   ├── POST /
│   ├── PUT /{goal_id}
│   └── DELETE /{goal_id}
│
├── groups/
│   ├── GET /
│   ├── POST /
│   ├── GET /{group_id}
│   ├── PUT /{group_id}
│   ├── DELETE /{group_id}

│   ├── POST /{group_id}/join
│   ├── POST /{group_id}/leave
│   ├── GET /{group_id}/members
│   ├── GET /{group_id}/activity
│   └── GET /{group_id}/leaderboard
│
├── feed/
│   ├── GET /                    # Get Daily Deen Feed
│   ├── POST /milestone          # Auto-post milestone
│   ├── POST /reflection         # User-generated Tadabbur
│   └── PUT /{post_id}/react     # SubhanAllah/Ameen reactions
│
├── focus/
│   ├── GET /preferences         # Get Focus Mode settings
│   ├── PUT /preferences         # Update settings
│   ├── POST /session/start      # Start a Focus session
│   ├── PUT /session/complete    # Complete session
│   ├── GET /sessions            # Session history
│   └── GET /stats               # Focus statistics
│
├── hasanat/
│   ├── GET /                    # Get total Hasanat
│   ├── GET /history             # Get history by day/week
│   └── POST /log                # Log Hasanat from a session
│
├── dhikr/
│   ├── GET /recommended         # Get recommended dhikr
│   └── POST /session            # Log a dhikr session
│
├── calendar/
│   ├── GET /prayer-times        # Get prayer times for location
│   └── GET /hijri               # Get Hijri calendar
│
├── competitions/
│   ├── GET /
│   ├── POST /
│   ├── GET /{competition_id}
│   ├── POST /{competition_id}/join
│   ├── POST /{competition_id}/leave
│   ├── GET /{competition_id}/leaderboard
│   └── GET /{competition_id}/participants
│
├── chat/
│   ├── GET /conversations
│   ├── POST /conversations
│   ├── GET /conversations/{conversation_id}/messages
│   ├── POST /conversations/{conversation_id}/messages
│   └── PUT /messages/{message_id}/react
│
├── notifications/
│   ├── GET /
│   ├── PUT /{notification_id}/read
│   ├── POST /mark-all-read
│   ├── GET /settings
│   └── PUT /settings
│
├── achievements/
│   ├── GET /
│   └── GET /user/{user_id}
│
└── leaderboard/
    ├── GET /global
    ├── GET /friends
    └── GET /group/{group_id}

```

**WebSocket Endpoints:**

```
/ws/
├── /chat/{conversation_id}  # Real-time chat
└── /notifications           # Real-time notifications (optional)
```

---

## 4. Technology Stack

### Mobile Application (Frontend)

#### Flutter Framework
**Version:** 3.24+ (Stable)

**Why Flutter:**
- Single codebase for iOS and Android
- Native performance
- Rich UI components
- Hot reload for rapid development
- Large community and ecosystem
- Excellent documentation

#### State Management
**Primary:** Riverpod 2.0+

**Why Riverpod:**
- Type-safe
- Compile-time safety
- Easy testing
- Provider composition
- Better than Provider for complex apps

**Alternative:** Provider (if team prefers)

#### Core Flutter Packages


**Essential:**
```yaml
dependencies:
  flutter:
    sdk: flutter
  
  # State Management
  flutter_riverpod: ^2.5.1
  
  # Navigation
  go_router: ^14.0.0
  
  # API Communication
  dio: ^5.4.0
  retrofit: ^4.1.0
  
  # WebSocket
  web_socket_channel: ^2.4.0
  
  # Local Storage

  shared_preferences: ^2.2.2
  hive: ^2.2.3
  hive_flutter: ^1.1.0
  
  # Audio
  just_audio: ^0.9.36
  audio_service: ^0.18.12
  
  # Notifications
  flutter_local_notifications: ^17.0.0
  firebase_messaging: ^14.7.9
  
  # Firebase Core
  firebase_core: ^2.24.2
  
  # Charts & Graphs
  fl_chart: ^0.66.0
  
  # UI Helpers
  cached_network_image: ^3.3.1
  shimmer: ^3.0.0

  lottie: ^3.0.0
  
  # Utils
  intl: ^0.19.0
  timeago: ^3.6.0
  uuid: ^4.3.3
  
  # Permissions
  permission_handler: ^11.2.0
  
  # Image Picker
  image_picker: ^1.0.7
  
  # Connectivity
  connectivity_plus: ^5.0.2
  
  # Device Info
  device_info_plus: ^10.1.0
  
  # URL Launcher
  url_launcher: ^6.2.4


dev_dependencies:
  flutter_test:
    sdk: flutter
  
  # Code Generation
  build_runner: ^2.4.8
  retrofit_generator: ^8.1.0
  hive_generator: ^2.0.1
  
  # Linting
  flutter_lints: ^3.0.1
  
  # Testing
  mockito: ^5.4.4
  integration_test:
    sdk: flutter
```

---

### Backend

#### Python with FastAPI
**Python Version:** 3.11+
**FastAPI Version:** 0.109+

**Why FastAPI:**
- Extremely fast (based on Starlette and Pydantic)
- Automatic API documentation (Swagger/OpenAPI)
- Type hints and validation
- WebSocket support
- Async/await native support
- Easy to learn and use
- Production-ready

#### Backend Dependencies

**Core Framework:**
```txt

# Web Framework
fastapi==0.109.0
uvicorn[standard]==0.27.0
python-multipart==0.0.6

# ASGI Server
gunicorn==21.2.0

# Database
sqlalchemy==2.0.25
alembic==1.13.1
psycopg2-binary==2.9.9

# Redis
redis==5.0.1
hiredis==2.3.2

# Authentication
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
python-multipart==0.0.6


# Validation
pydantic==2.5.3
pydantic-settings==2.1.0
email-validator==2.1.0

# WebSocket
websockets==12.0

# Background Tasks (Optional)
celery==5.3.6
flower==2.0.1

# Cloud Storage
boto3==1.34.34

# Push Notifications
firebase-admin==6.4.0

# HTTP Client
httpx==0.26.0

aiohttp==3.9.1

# Utilities
python-dateutil==2.8.2
pytz==2023.3

# Monitoring & Logging
sentry-sdk==1.40.0
structlog==24.1.0

# Testing
pytest==7.4.4
pytest-asyncio==0.23.3
pytest-cov==4.1.0
httpx==0.26.0

# Development
black==23.12.1
flake8==7.0.0
mypy==1.8.0
```


---

### Database

#### PostgreSQL
**Version:** 15+ or 16+

**Why PostgreSQL:**
- Rock-solid reliability
- ACID compliance
- JSON/JSONB support for flexible data
- Full-text search
- Excellent performance
- Mature ecosystem
- Free and open source

**Extensions to Enable:**
```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";  -- UUID generation

CREATE EXTENSION IF NOT EXISTS "pg_trgm";    -- Text search
CREATE EXTENSION IF NOT EXISTS "btree_gin";  -- Index optimization
```

**Configuration Recommendations:**
```conf
# postgresql.conf optimizations
shared_buffers = 256MB          # 25% of RAM for dedicated server
effective_cache_size = 1GB      # 50% of RAM
work_mem = 16MB                 # Per operation
maintenance_work_mem = 128MB
max_connections = 100
```

---

#### Redis
**Version:** 7.0+

**Why Redis:**
- Extremely fast in-memory operations
- Perfect for caching and sessions
- Pub/sub for real-time features
- Sorted sets ideal for leaderboards
- TTL support for automatic cleanup

**Use Cases:**
- Chat message caching
- Real-time leaderboards
- Session storage
- Rate limiting
- Message queue (optional)

---

### Object Storage

#### Options (Choose One):

**1. AWS S3**
- Most popular
- Excellent documentation
- Global CDN with CloudFront
- Pay-as-you-go pricing

**2. Cloudflare R2**
- S3-compatible API
- Zero egress fees
- Built-in CDN
- Good pricing

**3. DigitalOcean Spaces**
- S3-compatible
- Simple pricing
- Integrated CDN
- Easy to use

**Storage Structure:**

```
bucket-name/
├── audio/
│   ├── reciters/
│   │   ├── reciter-1/
│   │   │   ├── 001.mp3
│   │   │   ├── 002.mp3
│   │   │   └── ...
│   │   └── reciter-2/
│   └── ...
├── avatars/
│   └── {user_id}/
│       └── avatar.jpg
└── groups/
    └── {group_id}/
        └── avatar.jpg
```

---

### External Services


#### Firebase Cloud Messaging (FCM)
**Purpose:** Push notifications

**Setup:**
- Create Firebase project
- Configure iOS and Android apps
- Download configuration files
- Integrate Firebase SDK

---

#### Sentry
**Purpose:** Error tracking and monitoring

**Features:**
- Real-time error tracking
- Performance monitoring
- Release tracking
- User feedback

---

### Development & Hosting

#### Version Control
**Platform:** GitHub or GitLab

**Repository Structure:**
```
quran-companion/
├── mobile/              # Flutter app
├── backend/             # FastAPI backend
├── database/            # Schema and migrations
├── docs/                # Documentation
└── infrastructure/      # Docker, k8s configs
```

---

#### Hosting Options

**Option 1: AWS (Scalable, Full-Featured)**
- **Compute:** EC2 or ECS
- **Database:** RDS PostgreSQL
- **Cache:** ElastiCache Redis
- **Storage:** S3
- **CDN:** CloudFront
- **Load Balancer:** ALB

**Option 2: DigitalOcean (Simple, Cost-Effective)**
- **Compute:** Droplets or App Platform
- **Database:** Managed PostgreSQL
- **Cache:** Managed Redis
- **Storage:** Spaces
- **CDN:** Spaces CDN
- **Load Balancer:** DigitalOcean LB

**Option 3: Railway (Fastest Setup)**
- **Compute:** Railway platform

- **Database:** Built-in PostgreSQL
- **Cache:** Built-in Redis
- **Storage:** External S3/R2
- **CDN:** CloudFlare

**Recommended for MVP:** DigitalOcean or Railway

---

## 5. Development Tools & Environment

### Required Software

#### For Mobile Development

**1. Flutter SDK**
- **Download:** https://flutter.dev/docs/get-started/install
- **Version:** 3.24+ (Stable channel)
- **Installation:**

  ```bash
  # macOS/Linux
  git clone https://github.com/flutter/flutter.git -b stable
  export PATH="$PATH:`pwd`/flutter/bin"
  
  # Verify installation
  flutter doctor
  ```

**2. Android Studio**
- **Download:** https://developer.android.com/studio
- **Purpose:** Android development, emulator
- **Required Plugins:**
  - Flutter plugin
  - Dart plugin
- **SDK Tools:**
  - Android SDK Platform-Tools
  - Android SDK Build-Tools

  - Android Emulator

**3. Xcode (macOS only)**
- **Download:** Mac App Store
- **Purpose:** iOS development, simulator
- **Version:** Latest stable
- **Additional:**
  ```bash
  sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
  sudo xcodebuild -runFirstLaunch
  ```

**4. IDE Options**

**Option A: Visual Studio Code (Recommended)**
- **Download:** https://code.visualstudio.com/
- **Extensions:**
  - Flutter

  - Dart
  - Prettier
  - GitLens
  - Error Lens
  - Thunder Client (API testing)

**Option B: Android Studio**
- Full-featured IDE
- Better Android debugging
- Heavier resource usage

**Option C: IntelliJ IDEA**
- Powerful features
- Good Dart/Flutter support

---

#### For Backend Development

**1. Python**
- **Version:** 3.11+

- **Download:** https://www.python.org/downloads/
- **Virtual Environment:**
  ```bash
  python -m venv venv
  source venv/bin/activate  # macOS/Linux
  venv\Scripts\activate     # Windows
  ```

**2. Poetry (Recommended for dependency management)**
- **Installation:**
  ```bash
  curl -sSL https://install.python-poetry.org | python3 -
  ```
- **Usage:**
  ```bash
  poetry init
  poetry add fastapi uvicorn
  poetry install

  ```

**3. IDE Options**

**Option A: VS Code**
- **Extensions:**
  - Python
  - Pylance
  - Python Debugger
  - autoDocstring
  - Better Comments

**Option B: PyCharm**
- Professional or Community
- Excellent Python support
- Built-in database tools

---

#### Database Tools

**1. PostgreSQL Client**
- **pgAdmin:** GUI for PostgreSQL
- **DBeaver:** Universal database tool
- **TablePlus:** Modern database GUI (paid)
- **psql:** Command-line client

**2. Redis Client**
- **RedisInsight:** Official Redis GUI
- **Another Redis Desktop Manager:** Open source alternative
- **redis-cli:** Command-line tool

---

#### API Development & Testing

**1. Postman or Insomnia**
- API testing and documentation
- Collection sharing
- Environment variables


**2. FastAPI Built-in Docs**
- Swagger UI: `/docs`
- ReDoc: `/redoc`
- Automatic from code

---

#### Version Control

**1. Git**
- **Download:** https://git-scm.com/
- **Configuration:**
  ```bash
  git config --global user.name "Your Name"
  git config --global user.email "your.email@example.com"
  ```

```
**2. Git Client (Optional)**

- **GitHub Desktop:** Simple GUI
- **GitKraken:** Advanced features, visual
- **SourceTree:** Free, feature-rich
- **Command line:** Most flexible

---

#### Containerization & Orchestration

**1. Docker**
- **Download:** https://www.docker.com/products/docker-desktop
- **Purpose:** Containerization, local development
- **Version:** Latest stable
- **Verify:**
  ```bash
  docker --version
  docker-compose --version
  ```

**2. Docker Compose**
- Usually included with Docker Desktop
- For multi-container local development

---

#### Cloud CLI Tools

**1. AWS CLI (if using AWS)**
```bash
# Install
pip install awscli

# Configure
aws configure
```

**2. DigitalOcean CLI (if using DO)**
```bash
# Install
brew install doctl  # macOS

snap install doctl  # Linux

# Authenticate
doctl auth init
```

**3. Firebase CLI**
```bash
# Install
npm install -g firebase-tools

# Login
firebase login
```

---

#### Communication & Project Management

**1. Slack or Discord**

- Team communication
- Integration with GitHub, Sentry

**2. Project Management Tools**
- **Linear:** Modern, developer-focused
- **Jira:** Enterprise-grade
- **Trello:** Simple, visual
- **GitHub Projects:** Integrated with code
- **Notion:** All-in-one workspace

**3. Documentation**
- **Notion:** Team wiki
- **Confluence:** Enterprise docs
- **GitBook:** Public documentation
- **README.md:** In repository

---

#### Design & Assets

**1. Figma**

- UI/UX design
- Prototyping
- Collaboration
- Free for small teams

**2. Adobe XD (Alternative)**
- Design and prototyping
- Adobe ecosystem

**3. Asset Export Tools**
- **Zeplin:** Design handoff
- **Avocode:** Design specs

**4. Icon & Image Resources**
- **Unsplash:** Free images
- **Iconscout:** Icons and illustrations
- **Font Awesome:** Icon library
- **Google Fonts:** Typography

---

#### Monitoring & Analytics

**1. Sentry**
- Error tracking
- Performance monitoring
- Free tier available

**2. Analytics (Choose one)**
- **Google Analytics for Firebase:** Mobile analytics
- **Mixpanel:** Product analytics
- **Amplitude:** User behavior analytics

**3. Application Performance Monitoring**
- **New Relic:** Full-stack monitoring
- **DataDog:** Infrastructure monitoring
- **Prometheus + Grafana:** Open source

---

### Development Environment Setup


#### Local Development Setup Script

**Backend Setup:**
```bash
#!/bin/bash
# setup-backend.sh

# Create project directory
mkdir quran-companion-backend
cd quran-companion-backend

# Initialize Python virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install fastapi uvicorn sqlalchemy psycopg2-binary alembic redis python-jose passlib


# Create project structure
mkdir -p app/{api,core,models,schemas,services,db}
touch app/__init__.py
touch app/main.py
touch app/config.py

# Initialize Alembic for migrations
alembic init alembic

# Create .env file
cat > .env << EOF
DATABASE_URL=postgresql://user:password@localhost:5432/quran_db
REDIS_URL=redis://localhost:6379/0
SECRET_KEY=$(openssl rand -hex 32)
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
EOF

# Create .gitignore
cat > .gitignore << EOF
venv/
__pycache__/
*.pyc
.env
.DS_Store
*.db
EOF

echo "Backend setup complete!"
```

**Mobile Setup:**
```bash
#!/bin/bash
# setup-mobile.sh

# Create Flutter project
flutter create quran_companion

cd quran_companion

# Create project structure
mkdir -p lib/{core,features,shared}
mkdir -p lib/core/{constants,utils,theme}
mkdir -p lib/features/{auth,home,quran,progress,groups,competitions,chat,profile}
mkdir -p lib/shared/{widgets,models,services}

# Add dependencies to pubspec.yaml
flutter pub add flutter_riverpod
flutter pub add dio
flutter pub add go_router
flutter pub add shared_preferences
flutter pub add hive hive_flutter
flutter pub add just_audio
flutter pub add firebase_core firebase_messaging
flutter pub add flutter_local_notifications

flutter pub add cached_network_image
flutter pub add fl_chart

# Dev dependencies
flutter pub add --dev build_runner
flutter pub add --dev hive_generator
flutter pub add --dev flutter_lints

# Get dependencies
flutter pub get

echo "Mobile setup complete!"
```

**Docker Compose for Local Development:**
```yaml
# docker-compose.yml
version: '3.8'

services:

  postgres:
    image: postgres:16-alpine
    container_name: quran_db
    environment:
      POSTGRES_USER: quran_user
      POSTGRES_PASSWORD: quran_password
      POSTGRES_DB: quran_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - quran_network

  redis:
    image: redis:7-alpine
    container_name: quran_redis
    ports:
      - "6379:6379"

    volumes:
      - redis_data:/data
    networks:
      - quran_network

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: quran_backend
    command: uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
    ports:
      - "8000:8000"
    environment:
      DATABASE_URL: postgresql://quran_user:quran_password@postgres:5432/quran_db
      REDIS_URL: redis://redis:6379/0
    volumes:
      - ./backend:/app

    depends_on:
      - postgres
      - redis
    networks:
      - quran_network

  pgadmin:
    image: dpage/pgadmin4
    container_name: quran_pgadmin
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@quran.com
      PGADMIN_DEFAULT_PASSWORD: admin
    ports:
      - "5050:80"
    depends_on:
      - postgres
    networks:
      - quran_network

  redis-commander:
    image: rediscommander/redis-commander:latest
    container_name: quran_redis_commander
    environment:
      REDIS_HOSTS: local:redis:6379
    ports:
      - "8081:8081"
    depends_on:
      - redis
    networks:
      - quran_network

volumes:
  postgres_data:
  redis_data:

networks:
  quran_network:
    driver: bridge

```

**Start Local Environment:**
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Reset everything
docker-compose down -v
```

---

## 6. Team Structure & Roles

### Minimum Viable Team (MVP)

**Option 1: Solo Developer (Ambitious)**
- Full-stack developer with Flutter and Python experience
- Timeline: 5-6 months
- Recommended: Use templates and pre-built components

**Option 2: Small Team (Recommended)**
- 1 Flutter Developer (Mobile)
- 1 Backend Developer (Python/FastAPI)
- 1 UI/UX Designer (Part-time)
- 1 Project Manager / Product Owner
- Timeline: 3-4 months

**Option 3: Optimal Team**
- 2 Flutter Developers (iOS + Android focus)
- 1 Senior Backend Developer
- 1 DevOps Engineer (Part-time)
- 1 UI/UX Designer

- 1 QA Engineer
- 1 Product Manager
- Timeline: 2-3 months

---

### Role Responsibilities

#### 1. Mobile Developer (Flutter)
**Key Responsibilities:**
- Implement all 25 MVP screens
- State management with Riverpod
- API integration
- Local storage implementation
- Audio player integration
- Push notification setup
- iOS and Android platform-specific code
- App store submission

**Skills Required:**
- Flutter & Dart proficiency

- Mobile UI/UX best practices
- REST API integration
- State management patterns
- Audio streaming experience
- Firebase integration
- Git version control

**Tools:**
- Flutter SDK
- VS Code or Android Studio
- Xcode (for iOS)
- Figma for design specs
- Postman for API testing

---

#### 2. Backend Developer (Python)
**Key Responsibilities:**
- FastAPI application setup
- Database schema design
- RESTful API development

- WebSocket implementation for chat
- Authentication & authorization
- Business logic implementation
- Database optimization
- API documentation

**Skills Required:**
- Python proficiency
- FastAPI or similar frameworks
- PostgreSQL & SQL
- Redis caching
- WebSocket/real-time features
- JWT authentication
- API design best practices
- Git version control

**Tools:**
- Python 3.11+
- PyCharm or VS Code
- PostgreSQL client
- Redis client

- Postman or Insomnia
- Docker

---

#### 3. UI/UX Designer
**Key Responsibilities:**
- App branding and visual identity
- Design system creation
- All screen mockups (25+ screens)
- User flow diagrams
- Icon and asset creation
- Prototyping
- User research (if time permits)

**Skills Required:**
- UI/UX design principles
- Mobile design patterns
- Islamic design aesthetics
- Typography and color theory
- Prototyping

- User research

**Tools:**
- Figma (primary)
- Adobe Illustrator
- Icon libraries
- Color palette tools

**Deliverables:**
- Design system documentation
- High-fidelity mockups
- Interactive prototype
- Asset exports for developers
- Style guide

---

#### 4. DevOps Engineer
**Key Responsibilities:**
- CI/CD pipeline setup
- Infrastructure provisioning

- Database hosting configuration
- Redis setup
- S3/Object storage setup
- Monitoring and logging
- SSL certificates
- Backup strategies
- Security hardening

**Skills Required:**
- Docker & containerization
- CI/CD tools (GitHub Actions)
- Cloud platforms (AWS/DO)
- Database administration
- Linux server management
- Nginx configuration
- Security best practices

**Tools:**
- Docker & Docker Compose
- GitHub Actions or GitLab CI
- Terraform (optional)

- Monitoring tools
- Cloud provider CLIs

---

#### 5. QA Engineer
**Key Responsibilities:**
- Test plan creation
- Manual testing across devices
- Automated testing setup
- Bug tracking and reporting
- Performance testing
- Security testing
- Regression testing
- User acceptance testing coordination

**Skills Required:**
- Mobile app testing
- Test automation (Flutter test)
- Bug tracking tools
- API testing

- Performance testing
- Security awareness

**Tools:**
- Flutter test framework
- Postman for API testing
- Jira or Linear for bug tracking
- BrowserStack or similar for device testing
- Charles Proxy for network inspection

---

#### 6. Product Manager
**Key Responsibilities:**
- Product vision and roadmap
- Feature prioritization
- Requirements gathering
- Sprint planning
- Stakeholder communication
- User feedback analysis
- Release planning

- Metrics definition

**Skills Required:**
- Product management
- Agile methodologies
- User story writing
- Prioritization frameworks
- Communication skills
- Basic technical understanding

**Tools:**
- Linear or Jira
- Notion or Confluence
- Figma (for reviewing designs)
- Analytics platforms
- Communication tools

---

### Team Communication Structure

**Daily:**
- Stand-up meeting (15 min)
  - What did you do yesterday?
  - What will you do today?
  - Any blockers?

**Weekly:**
- Sprint planning (1 hour)
- Design review (30 min)
- Technical sync (30 min)

**Bi-weekly:**
- Sprint retrospective (45 min)
- Demo to stakeholders (30 min)

**Tools:**
- **Slack/Discord:** Daily communication
- **Linear/Jira:** Task management
- **GitHub:** Code collaboration
- **Figma:** Design collaboration
- **Google Meet/Zoom:** Video calls


---

## 7. Development Workflow

### Git Workflow

**Branch Strategy (GitHub Flow - Simplified):**

```
main (production)
  ↑
  └── develop (integration)
       ↑
       ├── feature/user-authentication
       ├── feature/quran-reader
       ├── feature/group-management
       ├── bugfix/chat-timestamp
       └── hotfix/critical-crash
```


**Branch Naming Convention:**
```
feature/feature-name      # New features
bugfix/bug-description    # Bug fixes
hotfix/critical-issue     # Production hotfixes
chore/maintenance-task    # Maintenance tasks
```

**Commit Message Convention:**
```
type(scope): subject

types: feat, fix, docs, style, refactor, test, chore
scope: auth, ui, api, db, etc.

Examples:
feat(auth): add JWT token refresh logic

fix(chat): resolve message ordering issue
docs(readme): update installation instructions
```

---

### Pull Request Process

**1. Create Feature Branch:**
```bash
git checkout develop
git pull origin develop
git checkout -b feature/quran-reader
```

**2. Develop and Commit:**
```bash
git add .
git commit -m "feat(quran): add Surah list view"

git push origin feature/quran-reader
```

**3. Create Pull Request:**
- Title: Clear, descriptive
- Description: What, why, how
- Screenshots: For UI changes
- Testing notes: How to test
- Linked issues: Reference issue numbers

**4. Code Review:**
- At least 1 approval required
- Address review comments
- CI/CD must pass

**5. Merge:**
- Squash and merge (keep history clean)
- Delete branch after merge

---

### Code Review Checklist

**General:**
- [ ] Code follows project style guide
- [ ] No unnecessary comments or dead code
- [ ] Variable names are clear and descriptive
- [ ] Functions are small and focused
- [ ] No hardcoded values (use constants/config)

**Mobile (Flutter):**
- [ ] Widgets are properly decomposed
- [ ] State management is appropriate
- [ ] No unnecessary rebuilds
- [ ] Images are optimized
- [ ] Accessibility labels included
- [ ] Error handling implemented
- [ ] Loading states shown

**Backend (Python):**
- [ ] Type hints are used
- [ ] Error handling with proper status codes
- [ ] Input validation implemented
- [ ] Database queries are optimized
- [ ] No SQL injection vulnerabilities
- [ ] Authentication/authorization checked
- [ ] Logging added for important operations

**Database:**
- [ ] Migrations are reversible
- [ ] Indexes added where needed
- [ ] No N+1 query problems
- [ ] Foreign keys defined properly

---

### Sprint Methodology

**Sprint Duration:** 2 weeks

**Sprint Cycle:**

**Week 1:**
- **Monday:** Sprint planning (2 hours)
  - Review product backlog
  - Select sprint backlog items
  - Break down tasks
  - Assign tasks
  
- **Daily:** Stand-up (15 min)
  
- **Wednesday:** Mid-sprint check-in (30 min)
  - Progress review
  - Identify blockers
  - Adjust if needed

**Week 2:**
- **Daily:** Stand-up (15 min)
  
- **Wednesday:** Code freeze (for testing)

  
- **Friday:** Sprint review & retrospective
  - Demo completed features (1 hour)
  - Retrospective (45 min)
    - What went well?
    - What can improve?
    - Action items

---

### Definition of Done

**Feature is "Done" when:**

- [ ] Code is written and reviewed
- [ ] Unit tests pass
- [ ] Integration tests pass (if applicable)
- [ ] Documentation updated
- [ ] UI matches design specs
- [ ] Tested on iOS and Android (for mobile)
- [ ] No critical bugs

- [ ] Accepted by Product Manager
- [ ] Merged to develop branch

---

## 8. Infrastructure & DevOps

### CI/CD Pipeline

**GitHub Actions Workflow:**

**Mobile CI/CD (`.github/workflows/mobile.yml`):**
```yaml
name: Mobile CI/CD

on:
  push:
    branches: [develop, main]
  pull_request:
    branches: [develop, main]


jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - uses: subosito/flutter-action@v2
        with:
          flutter-version: '3.24.0'
          channel: 'stable'
      
      - name: Install dependencies
        run: flutter pub get
        working-directory: ./mobile
      
      - name: Analyze code
        run: flutter analyze
        working-directory: ./mobile
      
      - name: Run tests

        run: flutter test
        working-directory: ./mobile
      
      - name: Build APK
        run: flutter build apk --release
        working-directory: ./mobile
        if: github.ref == 'refs/heads/main'

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Firebase App Distribution
        uses: wzieba/Firebase-Distribution-Github-Action@v1
        with:
          appId: ${{secrets.FIREBASE_APP_ID}}

          token: ${{secrets.FIREBASE_TOKEN}}
          groups: testers
          file: mobile/build/app/outputs/flutter-apk/app-release.apk
```

**Backend CI/CD (`.github/workflows/backend.yml`):**
```yaml
name: Backend CI/CD

on:
  push:
    branches: [develop, main]
  pull_request:
    branches: [develop, main]

jobs:
  test:
    runs-on: ubuntu-latest
    

    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: test_db
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432
      
      redis:
        image: redis:7-alpine
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

        ports:
          - 6379:6379
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      
      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install -r requirements.txt
        working-directory: ./backend
      
      - name: Run linter
        run: |
          pip install flake8
          flake8 . --count --

select=E9,F63,F7,F82 --show-source --statistics
        working-directory: ./backend
      
      - name: Run tests
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db
          REDIS_URL: redis://localhost:6379/0
        run: |
          pytest --cov=app --cov-report=xml
        working-directory: ./backend
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:

      - uses: actions/checkout@v3
      
      - name: Deploy to Production
        run: |
          # Add deployment script here
          # Could be: Railway, DigitalOcean, AWS, etc.
        env:
          DEPLOY_KEY: ${{ secrets.DEPLOY_KEY }}
```

---

### Infrastructure as Code

**Docker Configuration:**

**Backend Dockerfile:**
```dockerfile
# backend/Dockerfile

FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Create non-root user
RUN useradd -m -u 1000 appuser && chown -R appuser:appuser /app
USER appuser


# Expose port
EXPOSE 8000

# Run application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

**Nginx Configuration:**
```nginx
# nginx.conf
upstream backend {
    server backend:8000;
}

server {
    listen 80;
    server_name api.qurancompanion.com;
    
    # Redirect to HTTPS

    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name api.qurancompanion.com;
    
    # SSL certificates
    ssl_certificate /etc/nginx/ssl/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/key.pem;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    
    # API endpoints

    location /api/ {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # WebSocket
    location /ws/ {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP 

$remote_addr;
    }
    
    # Health check
    location /health {
        proxy_pass http://backend/health;
    }
}
```

---

### Environment Configuration

**Environment Variables Template:**

**Backend `.env.example`:**
```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/quran_db

DB_POOL_SIZE=20
DB_MAX_OVERFLOW=0

# Redis
REDIS_URL=redis://localhost:6379/0
REDIS_POOL_SIZE=10

# Security
SECRET_KEY=your-secret-key-here-use-openssl-rand-hex-32
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7

# AWS S3 / Object Storage
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
S3_BUCKET_NAME=quran-companion-assets

S3_AUDIO_PREFIX=audio/
S3_AVATAR_PREFIX=avatars/

# Firebase
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email

# Sentry
SENTRY_DSN=your-sentry-dsn
SENTRY_ENVIRONMENT=production

# Application
APP_NAME=Qur'an Companion API
APP_VERSION=1.0.0
DEBUG=False
CORS_ORIGINS=https://app.qurancompanion.com

# Email (if needed)

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

**Mobile Environment Configuration:**

Create `lib/core/config/env_config.dart`:
```dart
class EnvConfig {
  static const String apiBaseUrl = String.fromEnvironment(
    'API_BASE_URL',
    defaultValue: 'https://api.qurancompanion.com',
  );
  
  static const String wsBaseUrl = String.fromEnvironment(
    'WS_BASE_URL',

    defaultValue: 'wss://api.qurancompanion.com',
  );
  
  static const bool enableLogging = bool.fromEnvironment(
    'ENABLE_LOGGING',
    defaultValue: false,
  );
}
```

Run with:
```bash
flutter run --dart-define=API_BASE_URL=http://localhost:8000
```

---

### Deployment Environments

**1. Development**
- **Purpose:** Local development
- **Database:** Local PostgreSQL
- **Backend:** Local FastAPI
- **Mobile:** Emulator/Simulator

**2. Staging**
- **Purpose:** Testing before production
- **Database:** Staging PostgreSQL
- **Backend:** Staging server
- **Mobile:** TestFlight/Internal Testing
- **URL:** https://staging-api.qurancompanion.com

**3. Production**
- **Purpose:** Live app
- **Database:** Production PostgreSQL (with replicas)
- **Backend:** Production server (load 

balanced)
- **Mobile:** App Store/Play Store
- **URL:** https://api.qurancompanion.com

---

## 9. Security & Compliance

### Security Best Practices

**Authentication & Authorization:**
- [ ] JWT tokens with short expiration
- [ ] Refresh token rotation
- [ ] Password hashing with bcrypt (cost factor 12+)
- [ ] Rate limiting on auth endpoints
- [ ] Account lockout after failed attempts
- [ ] Email/phone verification

**API Security:**
- [ ] HTTPS only (TLS 1.2+)

- [ ] CORS properly configured
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention (use ORM)
- [ ] XSS prevention
- [ ] CSRF protection
- [ ] Request size limits
- [ ] Rate limiting per IP/user

**Data Protection:**
- [ ] Encrypt sensitive data at rest
- [ ] Encrypt data in transit
- [ ] No sensitive data in logs
- [ ] Secure environment variables
- [ ] Database connection encryption
- [ ] Regular security audits

**Mobile Security:**
- [ ] Certificate pinning (Phase 2)
- [ ] Secure local storage
- [ ] No secrets in code
- [ ] ProGuard/R8 obfuscation (Android)

- [ ] Jailbreak/root detection (Phase 2)

---

### Privacy & Compliance

**GDPR Compliance (if applicable):**
- [ ] Privacy policy
- [ ] Terms of service
- [ ] Cookie consent (web)
- [ ] Data export functionality
- [ ] Account deletion
- [ ] Data retention policies
- [ ] User consent tracking

**Islamic Content Guidelines:**
- [ ] Respectful Qur'an handling
- [ ] Appropriate content moderation
- [ ] Community guidelines
- [ ] Reporting mechanisms
- [ ] Scholar review (for tafsir in Phase 2)


---

## 10. Testing Strategy

### Testing Pyramid

```
           /\
          /  \
         / E2E\       (Few) - Critical user journeys
        /______\
       /        \
      / Integr. \     (Some) - API + Database
     /__________\
    /            \
   /    Unit      \   (Many) - Business logic
  /________________\
```

### Mobile Testing

**Unit Tests:**
```dart
// test/services/auth_service_test.dart
import 'package:flutter_test/flutter_test.dart';

void main() {
  group('AuthService', () {
    test('should validate email correctly', () {
      final authService = AuthService();
      
      expect(authService.isValidEmail('test@example.com'), true);
      expect(authService.isValidEmail('invalid-email'), false);
    });
    

    test('should hash password', () async {
      final authService = AuthService();
      final password = 'Test123!';
      
      final hashed = await authService.hashPassword(password);
      
      expect(hashed, isNot(password));
      expect(hashed.length, greaterThan(20));
    });
  });
}
```

**Widget Tests:**
```dart
// test/widgets/surah_card_test.dart
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter/material.dart';


void main() {
  testWidgets('SurahCard displays surah information', (tester) async {
    await tester.pumpWidget(
      MaterialApp(
        home: SurahCard(
          surahNumber: 1,
          surahName: 'Al-Fatihah',
          ayahCount: 7,
        ),
      ),
    );
    
    expect(find.text('Al-Fatihah'), findsOneWidget);
    expect(find.text('7 Ayahs'), findsOneWidget);
  });
}
```


**Integration Tests:**
```dart
// integration_test/login_test.dart
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();
  
  testWidgets('User can login successfully', (tester) async {
    app.main();
    await tester.pumpAndSettle();
    
    // Enter credentials
    await tester.enterText(

      find.byKey(Key('email_field')),
      'test@example.com',
    );
    await tester.enterText(
      find.byKey(Key('password_field')),
      'password123',
    );
    
    // Tap login
    await tester.tap(find.byKey(Key('login_button')));
    await tester.pumpAndSettle();
    
    // Verify navigation to home
    expect(find.text('Home'), findsOneWidget);
  });
}
```

---


### Backend Testing

**Unit Tests:**
```python
# tests/test_auth.py
import pytest
from app.services.auth_service import AuthService

@pytest.fixture
def auth_service():
    return AuthService()

def test_hash_password(auth_service):
    password = "Test123!"
    hashed = auth_service.hash_password(password)
    
    assert hashed != password
    assert len(hashed) > 20

    assert auth_service.verify_password(password, hashed)

def test_create_access_token(auth_service):
    user_id = "123"
    token = auth_service.create_access_token(user_id)
    
    assert token is not None
    assert isinstance(token, str)
```

**API Tests:**
```python
# tests/test_api.py
import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_register_user():
    response = client.post(
        "/api/v1/auth/register",
        json={
            "email": "test@example.com",
            "password": "Test123!",
            "username": "testuser"
        }
    )
    assert response.status_code == 201
    assert "id" in response.json()

def test_login_user():
    response = client.post(
        "/api/v1/auth/login",
        json={
            "email": "test@example.com",
            "password": "Test123!"
        }

    )
    assert response.status_code == 200
    assert "access_token" in response.json()
```

---

### Test Coverage Goals

- **Unit Tests:** 80%+ coverage
- **Integration Tests:** Critical paths covered
- **E2E Tests:** Main user journeys
- **Performance Tests:** Key endpoints under load

---

## 11. Deployment Strategy

### Pre-Launch Checklist


**Mobile App:**
- [ ] App Store Connect account created
- [ ] Google Play Console account created
```
**Mobile App (continued):**
- [ ] App icons (all sizes)
- [ ] Screenshots (all devices/orientations)
- [ ] App description and keywords
- [ ] Privacy policy URL
- [ ] Terms of service URL
- [ ] Support email/website
- [ ] Age rating completed
- [ ] In-app permissions justified
- [ ] Build signed with production keys
- [ ] Tested on physical devices
- [ ] Crashlytics/error tracking enabled
- [ ] Analytics configured
- [ ] Deep linking tested
- [ ] Push notifications tested

**Backend:**
- [ ] Production database provisioned
- [ ] Database backups configured
- [ ] Redis cache configured
- [ ] Object storage configured
- [ ] SSL certificates installed
- [ ] Domain DNS configured
- [ ] Environment variables set
- [ ] Monitoring configured
- [ ] Logging configured
- [ ] Rate limiting enabled
- [ ] CORS properly configured
- [ ] Health check endpoint working
- [ ] Load testing completed
- [ ] Security audit done

**Infrastructure:**
- [ ] Auto-scaling configured (if applicable)
- [ ] Backup strategy implemented
- [ ] Disaster recovery plan
- [ ] CI/CD pipeline tested

- [ ] Rollback procedure documented
- [ ] On-call schedule established

**Legal & Compliance:**
- [ ] Privacy policy published
- [ ] Terms of service published
- [ ] Cookie policy (if web version)
- [ ] GDPR compliance (if EU users)
- [ ] Content moderation policy
- [ ] Copyright notices

**Marketing:**
- [ ] Landing page live
- [ ] Social media accounts created
- [ ] Press kit prepared
- [ ] Launch announcement ready
- [ ] Influencer outreach (optional)
- [ ] Community groups notified

---

### App Store Deployment

#### iOS App Store

**Requirements:**
- Apple Developer Program membership ($99/year)
- macOS with Xcode
- App Store Connect access

**Steps:**

1. **Prepare App:**
```bash
# Clean project
flutter clean

# Get dependencies
flutter pub get

# Build iOS release

flutter build ios --release
```

2. **Create App in App Store Connect:**
- Log in to App Store Connect
- Create new app
- Fill in app information
- Set pricing (Free)
- Upload screenshots
- Write app description

3. **Upload Build:**
```bash
# Open Xcode
open ios/Runner.xcworkspace

# In Xcode:
# - Select "Any iOS Device"
# - Product > Archive
# - Wait for archive to complete
# - Click "Distribute App"

# - Select "App Store Connect"
# - Upload
```

4. **Submit for Review:**
- Select build in App Store Connect
- Fill in "What's New" notes
- Submit for review
- Wait 1-3 days for approval

**App Store Metadata:**
```
App Name: Qur'an Companion
Subtitle: Build Daily Qur'an Habits Together
Primary Category: Reference
Secondary Category: Lifestyle

Keywords: quran, muslim, islam, prayer, community, reading, recitation, 
          ramadan, habit, streak, group, competition


Description:
Build a lasting relationship with the Qur'an through community support 
and gentle motivation.

✨ Features:
• Read and listen to the complete Qur'an
• Track your daily reading progress and streaks
• Join supportive groups of brothers and sisters
• Participate in friendly competitions
• Connect through in-app messaging
• Set daily goals and receive reminders
• Beautiful, distraction-free interface

Perfect for Ramadan preparation and year-round Qur'an engagement.

Privacy Policy: https://

qurancompanion.com/privacy
Terms: https://qurancompanion.com/terms
Support: support@qurancompanion.com
```

---

#### Android Play Store

**Requirements:**
- Google Play Console account ($25 one-time)
- Signed release APK or App Bundle

**Steps:**

1. **Generate Release Keystore:**
```bash
keytool -genkey -v -keystore ~/upload-keystore.jks \

  -storetype JKS -keyalg RSA -keysize 2048 -validity 10000 \
  -alias upload
```

2. **Configure Signing (android/key.properties):**
```properties
storePassword=<password>
keyPassword=<password>
keyAlias=upload
storeFile=/path/to/upload-keystore.jks
```

3. **Update android/app/build.gradle:**
```gradle
def keystoreProperties = new Properties()
def keystorePropertiesFile = rootProject.file('key.properties')
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new 

FileInputStream(keystorePropertiesFile))
}

android {
    ...
    signingConfigs {
        release {
            keyAlias keystoreProperties['keyAlias']
            keyPassword keystoreProperties['keyPassword']
            storeFile keystoreProperties['storeFile'] ? file(keystoreProperties['storeFile']) : null
            storePassword keystoreProperties['storePassword']
        }
    }
    buildTypes {
        release {
            signingConfig 

signingConfigs.release
        }
    }
}
```

4. **Build App Bundle:**
```bash
flutter build appbundle --release
```

5. **Upload to Play Console:**
- Log in to Google Play Console
- Create new application
- Fill in store listing
- Upload app bundle (build/app/outputs/bundle/release/app-release.aab)
- Complete content rating questionnaire
- Set pricing (Free)
- Submit for review

**Play Store Listing:**
```
Short Description (80 chars):
Build daily Qur'an habits with community support and gentle motivation

Full Description (4000 chars):
Build a Lasting Relationship with the Qur'an

Qur'an Companion helps you develop a consistent, meaningful practice of 
Qur'an reading and recitation through community support and respectful 
motivation.

📖 QURANIC FEATURES
• Complete Qur'an text with beautiful typography
• Multiple renowned reciters for audio playback
• Bookmark your progress

• Smooth, distraction-free reading experience
• Surah and Juz navigation

📊 TRACK YOUR PROGRESS
• Daily reading sessions logged automatically
• Streak tracking to build consistency
• Weekly and monthly summaries
• Visual progress charts
• Personal milestones and achievements

👥 COMMUNITY & GROUPS
• Join groups of like-minded Muslims
• Create private groups with friends and family
• Group progress leaderboards
• Share encouragement and support
• Build accountability together

🏆 FRIENDLY COMPETITIONS

• Participate in time-bound challenges
• Compete with friends or globally
• Track rankings in real-time
• Respectful, ego-free gamification
• Focus on personal growth

💬 IN-APP MESSAGING
• Connect with group members
• Private conversations
• Share motivation and support
• Build Islamic brotherhood/sisterhood

⏰ REMINDERS & MOTIVATION
• Daily Qur'an reminders
• Customizable notification times
• Streak maintenance alerts
• Motivational ayahs and hadiths

🎯 GOAL SETTING
• Set daily, weekly, or monthly goals
• Track pages, ayahs, or time

• Adjust goals as needed
• Celebrate achievements

✨ DESIGNED FOR WORSHIP
• Simple, beautiful interface
• No ads or distractions
• Respectful of Islamic values
• Privacy-focused
• Free forever

Perfect for:
• Ramadan preparation and completion
• Building year-round Qur'an habits
• Muslim study groups and circles
• Families learning together
• Anyone seeking consistent Qur'an engagement

Our mission is to help Muslims worldwide develop a deeper connection 
with the Qur'an through community 

support and thoughtful technology.

Privacy Policy: https://qurancompanion.com/privacy
Terms: https://qurancompanion.com/terms
Support: support@qurancompanion.com
```

---

### Backend Deployment

#### Option 1: DigitalOcean App Platform (Recommended for MVP)

**Advantages:**
- Simple deployment
- Managed infrastructure
- Auto-scaling
- Built-in monitoring

- Affordable

**Steps:**

1. **Connect GitHub Repository:**
```bash
# Push code to GitHub
git remote add origin https://github.com/yourusername/quran-backend.git
git push -u origin main
```

2. **Create App in DigitalOcean:**
- Go to App Platform
- Create App from GitHub
- Select repository and branch
- Configure:
  - **Name:** quran-companion-api
  - **Region:** Choose closest to users
  - **Instance Size:** Basic ($12/month)
  - **Environment Variables:** Add from 

.env

3. **Configure Database:**
- Add Managed PostgreSQL ($15/month)
- Add Managed Redis ($15/month)
- Note connection strings

4. **Configure Domain:**
- Add custom domain: api.qurancompanion.com
- SSL automatically configured

5. **Deploy:**
- Click Deploy
- Wait for build and deployment
- Monitor logs

**Total Monthly Cost: ~$42**

---

#### Option 2: AWS (Scalable for Growth)

**Services Used:**
- **ECS Fargate:** Container hosting
- **RDS PostgreSQL:** Database
- **ElastiCache Redis:** Cache
- **S3:** Object storage
- **CloudFront:** CDN
- **ALB:** Load balancer
- **Route 53:** DNS

**Deployment Script:**
```bash
#!/bin/bash
# deploy-aws.sh

# Build Docker image
docker build -t quran-backend .

# Tag image
docker tag quran-backend:latest \

  $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/quran-backend:latest

# Push to ECR
aws ecr get-login-password --region $AWS_REGION | \
  docker login --username AWS --password-stdin \
  $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/quran-backend:latest

# Update ECS service
aws ecs update-service \
  --cluster quran-cluster \
  --service quran-backend-service \
  --force-new-deployment

```

---

#### Option 3: Railway (Fastest Setup)

**Advantages:**
- Extremely simple
- Free tier available
- Auto-deployment from Git
- Built-in PostgreSQL and Redis

**Steps:**

1. **Sign up:** railway.app
2. **New Project from GitHub**
3. **Add PostgreSQL and Redis**
4. **Configure Environment Variables**
5. **Deploy:** Automatic on push

**Cost:** Free tier, then $5/month+


---

### Deployment Strategy

**Blue-Green Deployment:**

1. **Blue Environment:** Current production
2. **Green Environment:** New version
3. **Test Green:** Smoke tests
4. **Switch Traffic:** From Blue to Green
5. **Monitor:** Watch for errors
6. **Rollback if needed:** Switch back to Blue

**Rolling Deployment:**
- Deploy to 10% of servers
- Monitor metrics
- Gradually increase to 100%
- Rollback if errors spike


---

### Database Migration Strategy

**Zero-Downtime Migrations:**

1. **Backward-compatible changes first:**
```python
# Good: Add new column (nullable)
def upgrade():
    op.add_column('users', sa.Column('phone', sa.String(20), nullable=True))

def downgrade():
    op.drop_column('users', 'phone')
```

2. **Deploy application code**
3. **Run migration**

4. **Remove old code (next deployment)**

**Avoid:**
```python
# Bad: Renaming columns (breaks old code)
op.alter_column('users', 'email', new_column_name='email_address')
```

**Instead:**
1. Add new column
2. Migrate data
3. Deploy code using new column
4. Remove old column (later)

---

### Rollback Procedures

**Mobile App Rollback:**

- Not possible once released
- Use feature flags to disable features
- Release hotfix ASAP

**Backend Rollback:**

**Quick Rollback:**
```bash
# Revert to previous deployment
kubectl rollout undo deployment/quran-backend

# Or for DigitalOcean
doctl apps deployment rollback <app-id> <deployment-id>
```

**Database Rollback:**
```bash
# Run down migration
alembic downgrade -1


# Or restore from backup
psql $DATABASE_URL < backup.sql
```

---

## 12. Monitoring & Maintenance

### Monitoring Stack

#### Application Performance Monitoring

**Sentry (Error Tracking):**

**Backend Integration:**
```python
# app/main.py
import sentry_sdk
from sentry_sdk.integrations.fastapi import FastApiIntegration


sentry_sdk.init(
    dsn=settings.SENTRY_DSN,
    environment=settings.ENVIRONMENT,
    integrations=[FastApiIntegration()],
    traces_sample_rate=0.1,
)
```

**Mobile Integration:**
```dart
// lib/main.dart
import 'package:sentry_flutter/sentry_flutter.dart';

await SentryFlutter.init(
  (options) {
    options.dsn = 'your-sentry-dsn';
    options.environment = 'production';
    options.tracesSampleRate = 0.1;
  },

  appRunner: () => runApp(MyApp()),
);
```

---

#### Logging

**Backend Logging:**
```python
# app/core/logger.py
import logging
import structlog

structlog.configure(
    processors=[
        structlog.stdlib.filter_by_level,
        structlog.stdlib.add_logger_name,
        structlog.stdlib.add_log_level,
        structlog.stdlib.PositionalArgumentsForma

tter(),
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.processors.StackInfoRenderer(),
        structlog.processors.format_exc_info,
        structlog.processors.UnicodeDecoder(),
        structlog.processors.JSONRenderer()
    ],
    wrapper_class=structlog.stdlib.BoundLogger,
    context_class=dict,
    logger_factory=structlog.stdlib.LoggerFactory(),
    cache_logger_on_first_use=True,
)

logger = structlog.get_logger()

# Usage
logger.info("user_registered", user_id=user.id, email=user.email)
logger.error("database_error", error=str(e), query=query)
```

**Mobile Logging:**
```dart
// lib/core/utils/logger.dart
import 'package:logger/logger.dart';

class AppLogger {
  static final Logger _logger = Logger(
    printer: PrettyPrinter(
      methodCount: 0,
      errorMethodCount: 5,
      lineLength: 50,
      colors: true,

      printEmojis: true,
    ),
  );

  static void debug(String message, [dynamic error, StackTrace? stackTrace]) {
    _logger.d(message, error, stackTrace);
  }

  static void info(String message) {
    _logger.i(message);
  }

  static void warning(String message, [dynamic error]) {
    _logger.w(message, error);
  }

  static void error(String message, [dynamic error, StackTrace? stackTrace]) {
    _logger.e(message, error, stackTrace);

  }
}
```

---

#### Metrics & Analytics

**Backend Metrics:**
```python
# app/core/metrics.py
from prometheus_client import Counter, Histogram, Gauge

# Request metrics
http_requests_total = Counter(
    'http_requests_total',
    'Total HTTP requests',
    ['method', 'endpoint', 'status']
)

http_request_duration = Histogram(
    'http_request_duration_seconds',
    'HTTP request duration',
    ['method', 'endpoint']
)

# Business metrics
user_registrations = Counter('user_registrations_total', 'Total user registrations')
quran_sessions = Counter('quran_sessions_total', 'Total Qur\'an reading sessions')
active_users = Gauge('active_users', 'Currently active users')

# Usage
@app.middleware("http")
async def track_requests(request: Request, call_next):
    start_time = time.time()

    response = await call_next(request)
    duration = time.time() - start_time
    
    http_requests_total.labels(
        method=request.method,
        endpoint=request.url.path,
        status=response.status_code
    ).inc()
    
    http_request_duration.labels(
        method=request.method,
        endpoint=request.url.path
    ).observe(duration)
    
    return response
```

**Mobile Analytics:**
```dart
// lib/core/services/analytics_service.dart
import 'package:firebase_analytics/

firebase_analytics.dart';

class AnalyticsService {
  final FirebaseAnalytics _analytics = FirebaseAnalytics.instance;

  Future<void> logEvent(String name, Map<String, dynamic>? parameters) async {
    await _analytics.logEvent(name: name, parameters: parameters);
  }

  Future<void> logScreenView(String screenName) async {
    await _analytics.logScreenView(screenName: screenName);
  }

  Future<void> logQuranSession({

    required int duration,
    required int ayahsRead,
    required String sessionType,
  }) async {
    await _analytics.logEvent(
      name: 'quran_session',
      parameters: {
        'duration': duration,
        'ayahs_read': ayahsRead,
        'session_type': sessionType,
      },
    );
  }
}
```

---

### Health Checks

**Backend Health Check:**

```python
# app/api/v1/health.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.core.redis import redis_client

router = APIRouter()

@router.get("/health")
async def health_check(db: Session = Depends(get_db)):
    health_status = {
        "status": "healthy",
        "checks": {}
    }
    
    # Database check
    try:
        db.execute("SELECT 1")
        health_status["checks"]["database"] = 

"healthy"
    except Exception as e:
        health_status["checks"]["database"] = "unhealthy"
        health_status["status"] = "unhealthy"
    
    # Redis check
    try:
        redis_client.ping()
        health_status["checks"]["redis"] = "healthy"
    except Exception as e:
        health_status["checks"]["redis"] = "unhealthy"
        health_status["status"] = "unhealthy"
    
    return health_status
```

---

### Alerting

**Alert Rules:**

**Critical Alerts (Page on-call immediately):**
- API error rate > 5%
- Database connection failures
- Service down
- Response time > 5 seconds (p95)

**Warning Alerts (Notify during business hours):**
- Error rate > 1%
- Disk usage > 80%
- Memory usage > 80%
- Response time > 2 seconds (p95)

**Info Alerts (Log only):**
- New user registrations spike
- Unusual traffic patterns

- Low severity errors

---

### Backup Strategy

**Database Backups:**
```bash
#!/bin/bash
# scripts/backup-database.sh

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="backup_${TIMESTAMP}.sql"

# Create backup
pg_dump $DATABASE_URL > $BACKUP_FILE

# Compress
gzip $BACKUP_FILE


# Upload to S3
aws s3 cp ${BACKUP_FILE}.gz s3://quran-backups/database/

# Keep local for 7 days
find . -name "backup_*.sql.gz" -mtime +7 -delete

echo "Backup completed: ${BACKUP_FILE}.gz"
```

**Backup Schedule:**
- **Full Backup:** Daily at 2 AM UTC
- **Incremental:** Every 6 hours
- **Retention:** 30 days
- **Test Restore:** Weekly

**Critical Data:**
- User data

- Reading sessions
- Messages (last 90 days)
- Group data

---

### Maintenance Windows

**Schedule:**
- **Preferred:** Sundays 2-4 AM UTC (lowest traffic)
- **Frequency:** Monthly or as needed
- **Notification:** 48 hours advance notice

**Maintenance Tasks:**
- Database optimization
- Index rebuilding
- Log rotation
- Security updates
- Performance tuning

---

### On-Call Procedures

**On-Call Rotation:**
- Primary: Backend engineer
- Secondary: DevOps engineer
- Escalation: Tech lead

**Incident Response:**

1. **Acknowledge:** Within 5 minutes
2. **Assess:** Severity and impact
3. **Communicate:** Update status page
4. **Fix:** Implement solution
5. **Document:** Post-mortem for major incidents

**Severity Levels:**

**SEV 1 (Critical):**

- Service completely down
- Data loss risk
- Security breach
- Response: Immediate

**SEV 2 (High):**
- Major feature broken
- Performance degraded significantly
- Response: Within 1 hour

**SEV 3 (Medium):**
- Minor feature broken
- Workaround available
- Response: Next business day

**SEV 4 (Low):**
- Cosmetic issues
- Enhancement requests
- Response: Planned maintenance

---


### Key Performance Indicators (KPIs)

**Technical KPIs:**
- **Uptime:** 99.9% target
- **API Response Time:** <500ms (p95)
- **Error Rate:** <0.1%
- **Database Query Time:** <100ms (p95)
- **Mobile App Crash Rate:** <0.1%

**Business KPIs:**
- **Daily Active Users (DAU)**
- **Monthly Active Users (MAU)**
- **DAU/MAU Ratio:** >20% target
- **Average Session Length:** >10 min
- **Streak Retention:** 7-day, 30-day
- **Group Participation:** >40% of users
- **Competition Participation:** >30% of users
- **Messages Sent:** Average per user
- **Qur'an Completion Rate**


**User Engagement:**
```sql
-- Example analytics queries

-- Daily active users
SELECT DATE(last_login) as date, COUNT(DISTINCT user_id) as dau
FROM users
WHERE last_login >= NOW() - INTERVAL '30 days'
GROUP BY DATE(last_login);

-- Average streak length
SELECT AVG(current_streak) as avg_streak
FROM user_progress;

-- Most active groups
SELECT g.id, g.name, COUNT(DISTINCT gm.user_id) as members,
       COUNT(DISTINCT rs.id) as 

total_sessions
FROM groups g
JOIN group_members gm ON g.id = gm.group_id
JOIN reading_sessions rs ON rs.user_id = gm.user_id
WHERE rs.created_at >= NOW() - INTERVAL '7 days'
GROUP BY g.id, g.name
ORDER BY total_sessions DESC
LIMIT 10;
```

---

## Summary & Next Steps

### MVP Development Timeline

**Month 1-2: Foundation (8 weeks)**
- Week 1-2: Setup, architecture, database

- Week 3-4: Authentication, user profiles
- Week 5-6: Qur'an integration, basic UI
- Week 7-8: Progress tracking, goals

**Month 3: Core Features (4 weeks)**
- Week 9-10: Groups, competitions
- Week 11-12: Leaderboards, achievements

**Month 4: Communication (4 weeks)**
- Week 13-14: In-app chat
- Week 15-16: Notifications, polish

**Month 5: Testing & Polish (4 weeks)**
- Week 17: UI/UX refinement
- Week 18: Beta testing
- Week 19: Bug fixes, optimization
- Week 20: Final testing

**Month 6: Launch (2 weeks)**
- Week 21: Soft launch
- Week 22-24: Full launch before Ramadan


---

### Immediate Action Items

**Week 1:**
- [ ] Assemble team
- [ ] Set up repositories (GitHub)
- [ ] Initialize Flutter project
- [ ] Initialize FastAPI project
- [ ] Set up local development environment
- [ ] Create Docker Compose setup
- [ ] Design database schema
- [ ] Create Figma design system

**Week 2:**
- [ ] Implement authentication (backend)
- [ ] Implement user registration (mobile)
- [ ] Set up CI/CD pipelines
- [ ] Configure Sentry
- [ ] Set up staging environment

- [ ] Create API documentation structure

---

### Critical Success Factors

1. **Keep it Simple:** Resist feature creep
2. **Focus on Quality:** Stable > Feature-rich
3. **Community First:** Groups and competitions are key differentiators
4. **Islamic Values:** Respectful, worship-focused design
5. **Launch on Time:** Ramadan is the key opportunity
6. **Listen to Users:** Rapid iteration post-launch
7. **Sustainable:** Technical debt manageable, costs affordable

---


### Resources & References

**Documentation:**
- Flutter: https://flutter.dev/docs
- FastAPI: https://fastapi.tiangolo.com
- PostgreSQL: https://www.postgresql.org/docs
- Redis: https://redis.io/documentation

**Learning:**
- Flutter & Firebase: https://firebase.flutter.dev
- FastAPI Tutorial: https://fastapi.tiangolo.com/tutorial
- System Design: https://github.com/donnemartin/system-design-primer

**Community:**
- Flutter Discord
- r/FlutterDev

- FastAPI Discord
- r/FastAPI

**Islamic Resources:**
- Qur'an API: https://alquran.cloud/api
- Islamic Design Principles
- Muslim Developer Communities

---

**May Allah (SWT) make this project a means of benefit for the Ummah and accept it as a righteous deed. Ameen.**