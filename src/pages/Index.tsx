import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [newCharacter, setNewCharacter] = useState({
    name: '',
    description: '',
    personality: '',
    greeting: ''
  });

  const popularCharacters = [
    {
      id: 1,
      name: 'Алекс',
      description: 'Дружелюбный AI-ассистент для программирования',
      avatar: '/img/bd63c0b7-440f-4239-9e56-df94bf115aae.jpg',
      category: 'Технологии',
      chats: 12500,
      rating: 4.9
    },
    {
      id: 2,
      name: 'Ева',
      description: 'Креативный помощник для дизайна и искусства',
      avatar: '/img/27cfc4cc-f473-455c-b6af-7eb4c9717bad.jpg',
      category: 'Творчество',
      chats: 8900,
      rating: 4.8
    },
    {
      id: 3,
      name: 'Мудрец',
      description: 'Философ и наставник для жизненных вопросов',
      avatar: '/img/b33b0939-95b8-4e5d-a7e9-a5ddf6640bf8.jpg',
      category: 'Философия',
      chats: 15600,
      rating: 4.9
    }
  ];

  const categories = ['Все', 'Технологии', 'Творчество', 'Философия', 'Образование', 'Развлечения'];
  const [selectedCategory, setSelectedCategory] = useState('Все');

  const filteredCharacters = popularCharacters.filter(char => 
    (selectedCategory === 'Все' || char.category === selectedCategory) &&
    (char.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     char.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCreateCharacter = () => {
    console.log('Создание персонажа:', newCharacter);
    setNewCharacter({ name: '', description: '', personality: '', greeting: '' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass-effect border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 tech-gradient rounded-lg flex items-center justify-center">
                  <Icon name="Bot" size={20} className="text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                  CharacterAI
                </h1>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                Главная
              </Button>
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                Сообщество
              </Button>
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                Мои персонажи
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="tech-gradient hover:opacity-90">
                    <Icon name="Plus" size={16} className="mr-2" />
                    Создать персонажа
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md glass-effect border-white/20">
                  <DialogHeader>
                    <DialogTitle className="text-foreground">Создать AI-персонажа</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Имя персонажа</Label>
                      <Input
                        id="name"
                        value={newCharacter.name}
                        onChange={(e) => setNewCharacter({...newCharacter, name: e.target.value})}
                        placeholder="Введите имя..."
                        className="bg-white/5 border-white/20"
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Описание</Label>
                      <Input
                        id="description"
                        value={newCharacter.description}
                        onChange={(e) => setNewCharacter({...newCharacter, description: e.target.value})}
                        placeholder="Краткое описание персонажа..."
                        className="bg-white/5 border-white/20"
                      />
                    </div>
                    <div>
                      <Label htmlFor="personality">Личность</Label>
                      <Textarea
                        id="personality"
                        value={newCharacter.personality}
                        onChange={(e) => setNewCharacter({...newCharacter, personality: e.target.value})}
                        placeholder="Опишите характер и особенности..."
                        className="bg-white/5 border-white/20"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="greeting">Приветствие</Label>
                      <Input
                        id="greeting"
                        value={newCharacter.greeting}
                        onChange={(e) => setNewCharacter({...newCharacter, greeting: e.target.value})}
                        placeholder="Первое сообщение от персонажа..."
                        className="bg-white/5 border-white/20"
                      />
                    </div>
                    <Button onClick={handleCreateCharacter} className="w-full tech-gradient">
                      Создать персонажа
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-primary via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Создавайте и общайтесь с AI-персонажами
            </h2>
            <p className="text-xl text-muted-foreground">
              Погрузитесь в мир искусственного интеллекта. Создавайте уникальных персонажей 
              или общайтесь с популярными AI-ассистентами.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Найти персонажа..."
                className="pl-10 h-12 glass-effect border-white/20 text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-16">
        <Tabs defaultValue="popular" className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 glass-effect">
            <TabsTrigger value="popular" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Популярные
            </TabsTrigger>
            <TabsTrigger value="community" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Сообщество
            </TabsTrigger>
          </TabsList>

          <TabsContent value="popular" className="space-y-6">
            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "tech-gradient" : "glass-effect border-white/20"}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Character Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCharacters.map((character) => (
                <Card key={character.id} className="character-card glass-effect border-white/20 group">
                  <CardHeader className="text-center">
                    <div className="w-20 h-20 mx-auto rounded-full overflow-hidden ai-glow">
                      <img 
                        src={character.avatar} 
                        alt={character.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardTitle className="text-foreground">{character.name}</CardTitle>
                    <Badge variant="secondary" className="w-fit mx-auto">
                      {character.category}
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-center">{character.description}</p>
                    
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Icon name="MessageCircle" size={14} />
                        <span>{character.chats.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Star" size={14} className="text-yellow-400" />
                        <span>{character.rating}</span>
                      </div>
                    </div>
                    
                    <Button className="w-full tech-gradient group-hover:shadow-lg transition-all">
                      <Icon name="MessageCircle" size={16} className="mr-2" />
                      Начать чат
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="community" className="space-y-6">
            <div className="text-center py-16">
              <Icon name="Users" size={64} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-2">Сообщество персонажей</h3>
              <p className="text-muted-foreground mb-6">
                Откройте для себя персонажей, созданных нашим сообществом
              </p>
              <Button className="tech-gradient">
                Просмотреть сообщество
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;