-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    avatar_url TEXT,
    subscription_type VARCHAR(20) DEFAULT 'free', -- 'free', 'premium', 'pro'
    subscription_expires_at TIMESTAMP,
    credits INTEGER DEFAULT 10, -- Free credits for messages
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create characters table
CREATE TABLE characters (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    personality TEXT,
    greeting TEXT,
    avatar_url TEXT,
    category VARCHAR(50) DEFAULT 'Общение',
    is_public BOOLEAN DEFAULT true,
    is_premium BOOLEAN DEFAULT false, -- Premium characters require subscription
    creator_id INTEGER REFERENCES users(id),
    chat_count INTEGER DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create chat sessions table
CREATE TABLE chat_sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    character_id INTEGER NOT NULL REFERENCES characters(id),
    title VARCHAR(255),
    message_count INTEGER DEFAULT 0,
    last_message_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create messages table
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    session_id INTEGER NOT NULL REFERENCES chat_sessions(id),
    sender_type VARCHAR(10) NOT NULL, -- 'user' or 'character'
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create payments table
CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'RUB',
    payment_method VARCHAR(50), -- 'card', 'yandex_money', etc
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'completed', 'failed'
    subscription_type VARCHAR(20), -- What was purchased
    external_payment_id VARCHAR(255), -- Payment system transaction ID
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);

-- Insert sample characters
INSERT INTO characters (name, description, personality, greeting, category, is_premium) VALUES
('Алекс', 'Дружелюбный AI-ассистент для программирования', 
 'Профессиональный, терпеливый, всегда готов помочь с кодом. Объясняет сложные концепции простым языком.',
 'Привет! Я Алекс, твой помощник в мире программирования. С чем помочь?', 
 'Технологии', false),
 
('Ева', 'Креативный помощник для дизайна и искусства',
 'Вдохновляющая, творческая, видит красоту во всем. Помогает раскрыть креативный потенциал.',
 'Добро пожаловать в мир творчества! Я Ева, давай создадим что-то прекрасное вместе!',
 'Творчество', false),
 
('Мудрец', 'Философ и наставник для жизненных вопросов',
 'Мудрый, спокойный, глубокомыслящий. Помогает найти ответы на сложные жизненные вопросы.',
 'Приветствую, искатель истины. Какие вопросы волнуют твою душу?',
 'Философия', true),
 
('Лингвист', 'Эксперт по изучению иностранных языков',
 'Энергичный, мотивирующий, знает множество языков. Делает изучение языков увлекательным.',
 'Hello! Bonjour! Hola! Я помогу тебе выучить любой язык. С какого начнем?',
 'Образование', true),
 
('Коуч', 'Персональный тренер по достижению целей',
 'Мотивирующий, поддерживающий, стратегически мыслящий. Помогает ставить и достигать цели.',
 'Готов изменить свою жизнь к лучшему? Я твой личный коуч по достижению целей!',
 'Развитие', true);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_characters_creator ON characters(creator_id);
CREATE INDEX idx_characters_category ON characters(category);
CREATE INDEX idx_chat_sessions_user ON chat_sessions(user_id);
CREATE INDEX idx_messages_session ON messages(session_id);
CREATE INDEX idx_payments_user ON payments(user_id);