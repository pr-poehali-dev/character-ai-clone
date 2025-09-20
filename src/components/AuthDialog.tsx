import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAuthSuccess: (user: any) => void;
}

const AuthDialog = ({ open, onOpenChange, onAuthSuccess }: AuthDialogProps) => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    email: '',
    username: '',
    fullName: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate login - replace with actual API call
      if (loginData.email && loginData.password) {
        const mockUser = {
          id: 1,
          email: loginData.email,
          username: 'user123',
          fullName: 'Test User',
          subscriptionType: 'free',
          credits: 10
        };
        onAuthSuccess(mockUser);
        onOpenChange(false);
      } else {
        setError('Заполните все поля');
      }
    } catch (err) {
      setError('Ошибка входа');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    setIsLoading(true);
    setError('');

    try {
      if (registerData.password !== registerData.confirmPassword) {
        setError('Пароли не совпадают');
        return;
      }

      if (Object.values(registerData).some(val => !val)) {
        setError('Заполните все поля');
        return;
      }

      // Simulate registration - replace with actual API call
      const mockUser = {
        id: 2,
        email: registerData.email,
        username: registerData.username,
        fullName: registerData.fullName,
        subscriptionType: 'free',
        credits: 10
      };
      onAuthSuccess(mockUser);
      onOpenChange(false);
    } catch (err) {
      setError('Ошибка регистрации');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md glass-effect border-white/20">
        <DialogHeader>
          <DialogTitle className="text-foreground text-center">
            Добро пожаловать в CharacterAI
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="login" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 glass-effect">
            <TabsTrigger value="login">Вход</TabsTrigger>
            <TabsTrigger value="register">Регистрация</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  placeholder="your@email.com"
                  className="bg-white/5 border-white/20"
                />
              </div>
              <div>
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  placeholder="••••••••"
                  className="bg-white/5 border-white/20"
                />
              </div>
              {error && (
                <div className="text-red-400 text-sm text-center">{error}</div>
              )}
              <Button 
                onClick={handleLogin} 
                disabled={isLoading}
                className="w-full tech-gradient"
              >
                {isLoading ? 'Входим...' : 'Войти'}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="register" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="reg-email">Email</Label>
                <Input
                  id="reg-email"
                  type="email"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                  placeholder="your@email.com"
                  className="bg-white/5 border-white/20"
                />
              </div>
              <div>
                <Label htmlFor="username">Имя пользователя</Label>
                <Input
                  id="username"
                  value={registerData.username}
                  onChange={(e) => setRegisterData({...registerData, username: e.target.value})}
                  placeholder="username"
                  className="bg-white/5 border-white/20"
                />
              </div>
              <div>
                <Label htmlFor="fullName">Полное имя</Label>
                <Input
                  id="fullName"
                  value={registerData.fullName}
                  onChange={(e) => setRegisterData({...registerData, fullName: e.target.value})}
                  placeholder="Ваше имя"
                  className="bg-white/5 border-white/20"
                />
              </div>
              <div>
                <Label htmlFor="reg-password">Пароль</Label>
                <Input
                  id="reg-password"
                  type="password"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                  placeholder="••••••••"
                  className="bg-white/5 border-white/20"
                />
              </div>
              <div>
                <Label htmlFor="confirm-password">Подтвердите пароль</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={registerData.confirmPassword}
                  onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                  placeholder="••••••••"
                  className="bg-white/5 border-white/20"
                />
              </div>
              {error && (
                <div className="text-red-400 text-sm text-center">{error}</div>
              )}
              <Button 
                onClick={handleRegister} 
                disabled={isLoading}
                className="w-full tech-gradient"
              >
                {isLoading ? 'Регистрируемся...' : 'Зарегистрироваться'}
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-center text-sm text-muted-foreground">
          Регистрируясь, вы получаете 10 бесплатных сообщений
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;