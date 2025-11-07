'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import AuthNavbar from '@/components/AuthNavbar';
import { 
  Heading, 
  Text, 
  Link, 
  Container, 
  Stack, 
  Flex, 
  Grid, 
  Card, 
  Button, 
  Badge,
  Icon,
  Box,
  LoadingScreen
} from '@/components/ui';

export default function Home() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Show loading while checking auth or during initial mount
  if (!mounted || authLoading) {
    return <LoadingScreen message="Loading..." />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Show AuthNavbar if logged in, otherwise show public nav */}
      {isAuthenticated ? (
        <AuthNavbar />
      ) : (
        <Box as="header" className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
          <Container maxWidth="7xl" padding="sm" className="md:px-6">
            <Flex justify="between" align="center" className="py-2 sm:py-3 md:py-4">
              <Heading as="h1" size="2xl" gradient className="m-0 text-lg sm:text-xl md:text-2xl lg:text-2xl">
                Portfolio Builder
              </Heading>
              
              <Flex gap="md" align="center" className="hidden md:flex">
                <Link href="#features" variant="nav">Features</Link>
                <Link href="#templates" variant="nav">Templates</Link>
                <Link href="#how-it-works" variant="nav">How It Works</Link>
              </Flex>
              
              <Flex gap="xs" align="center">
                <Link href="/login" className="hidden sm:inline-block">
                  <Button variant="ghost" size="sm" className="text-sm">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="primary" size="sm" className="text-sm px-3 sm:px-4 md:px-5 h-9 md:h-10">
                    Get Started
                  </Button>
                </Link>
              </Flex>
            </Flex>
          </Container>
        </Box>
      )}

      {/* Hero Section */}
      <main>
        <Box as="section" className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-16 sm:py-24 md:py-28 lg:py-32">
          <Container maxWidth="7xl" className="px-4 md:px-6 lg:px-8">
            <Stack spacing="lg" align="center">
              <Badge className="bg-indigo-100 text-indigo-800 px-3 py-1 md:px-4 md:py-2 text-sm md:text-base">
                <Icon emoji="✨" size="sm" /> No coding required
              </Badge>
              
              <Heading as="h1" size="5xl" align="center" weight='bold' className="px-6 sm:px-4 md:px-8 lg:px-0">
                Build Your Dream
                <br className="" />
                <Text as="span" weight='bold' className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Portfolio in Minutes
                </Text>
              </Heading>
              
              <Text size="2xl" lineHeight="tight" align="center" className="max-w-3xl leading-relaxed px-4 md:px-6 lg:px-0 text-base sm:text-lg md:text-xl lg:text-xl">
                Create a stunning, professional portfolio website without any coding. Choose from beautiful templates, 
                customize with ease, and share your work with the world.
              </Text>
              
              <Flex gap="sm" direction="col" align="stretch" className="w-full max-w-md px-4 sm:flex-row sm:justify-center sm:max-w-none md:px-0">
                {isAuthenticated ? (
                  <>
                    <Link href="/dashboard" className="w-full sm:w-auto">
                      <Button variant="primary" size="lg" className="w-full h-12 md:h-14 px-6 md:px-8">
                        Go to Dashboard
                      </Button>
                    </Link>
                    <Link href="/templates" className="w-full sm:w-auto">
                      <Button variant="outline" size="lg" className="w-full h-12 md:h-14 px-6 md:px-8">
                        Create New Portfolio
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/register" className="w-full sm:w-auto">
                      <Button variant="primary" size="lg" className="w-full h-12 md:h-14 px-6 md:px-8">
                        Create Your Portfolio Free
                      </Button>
                    </Link>
                    <Link href="/templates" className="w-full sm:w-auto">
                      <Button variant="outline" size="lg" className="w-full h-12 md:h-14 px-6 md:px-8">
                        View Templates
                      </Button>
                    </Link>
                  </>
                )}
              </Flex>

              <Text align="center" variant="caption" className="mt-4 md:mt-6">
                <Icon emoji="🎉" size="sm" /> Join hundreds of professionals showcasing their work
              </Text>
            </Stack>
          </Container>
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        </Box>

        {/* Features Section */}
        <section id="features" className="py-12 sm:py-20 md:py-24 lg:py-24 bg-white">
          <Container maxWidth="7xl" className="px-4 md:px-6 lg:px-8">
            <Stack spacing="xl" align="center" className="mb-12 sm:mb-16 md:mb-20 px-4">
              <Heading as="h2" size="4xl" align="center">
                Everything You Need to Shine
              </Heading>
              <Text size="xl" align="center" className="max-w-2xl text-base sm:text-lg md:text-xl lg:text-xl">
                Powerful features designed to make portfolio creation effortless
              </Text>
            </Stack>
            
            <Grid cols={1} mdCols={2} lgCols={3} gap="lg" className="md:gap-xl">
              <Card className="group bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 hover:shadow-xl transition-all p-4 md:p-6">
                <Stack spacing="md">
                  <Box className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon emoji="⚡" size="xl" />
                  </Box>
                  <Heading as="h3" size="2xl" className="text-lg md:text-xl">Lightning Fast</Heading>
                  <Text className="leading-relaxed text-sm md:text-base">
                    Get your portfolio up and running in just 5 minutes with our intuitive form-based editor.
                  </Text>
                </Stack>
              </Card>
              
              <Card className="group bg-gradient-to-br from-purple-50 to-white border border-purple-100 hover:shadow-xl transition-all p-4 md:p-6">
                <Stack spacing="md">
                  <Box className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon emoji="🎨" size="xl" />
                  </Box>
                  <Heading as="h3" size="2xl" className="text-lg md:text-xl">Beautiful Templates</Heading>
                  <Text className="leading-relaxed text-sm md:text-base">
                    Choose from professionally designed templates crafted for different professions and industries.
                  </Text>
                </Stack>
              </Card>
              
              <Card className="group bg-gradient-to-br from-blue-50 to-white border border-blue-100 hover:shadow-xl transition-all p-4 md:p-6">
                <Stack spacing="md">
                  <Box className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon emoji="🚀" size="xl" />
                  </Box>
                  <Heading as="h3" size="2xl" className="text-lg md:text-xl">Instant Publishing</Heading>
                  <Text className="leading-relaxed text-sm md:text-base">
                    Publish your portfolio with one click and get a shareable link to showcase your work.
                  </Text>
                </Stack>
              </Card>
              
              <Card className="group bg-gradient-to-br from-green-50 to-white border border-green-100 hover:shadow-xl transition-all p-4 md:p-6">
                <Stack spacing="md">
                  <Box className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon emoji="📱" size="xl" />
                  </Box>
                  <Heading as="h3" size="2xl" className="text-lg md:text-xl">Mobile Responsive</Heading>
                  <Text className="leading-relaxed text-sm md:text-base">
                    Your portfolio looks perfect on all devices - desktop, tablet, and mobile phones.
                  </Text>
                </Stack>
              </Card>
              
              <Card className="group bg-gradient-to-br from-orange-50 to-white border border-orange-100 hover:shadow-xl transition-all p-4 md:p-6">
                <Stack spacing="md">
                  <Box className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-orange-600 to-red-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon emoji="✏️" size="xl" />
                  </Box>
                  <Heading as="h3" size="2xl" className="text-lg md:text-xl">Easy Customization</Heading>
                  <Text className="leading-relaxed text-sm md:text-base">
                    Update your portfolio anytime with our simple editor. No technical skills required.
                  </Text>
                </Stack>
              </Card>
              
              <Card className="group bg-gradient-to-br from-pink-50 to-white border border-pink-100 hover:shadow-xl transition-all p-4 md:p-6">
                <Stack spacing="md">
                  <Box className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-pink-600 to-rose-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon emoji="🔒" size="xl" />
                  </Box>
                  <Heading as="h3" size="2xl" className="text-lg md:text-xl">Secure & Private</Heading>
                  <Text className="leading-relaxed text-sm md:text-base">
                    Your data is safe with us. Control who sees your portfolio with publish/unpublish options.
                  </Text>
                </Stack>
              </Card>
            </Grid>
          </Container>
        </section>

        {/* Templates Preview Section */}
        <section id="templates" className="py-12 sm:py-20 md:py-24 lg:py-24 bg-gradient-to-br from-gray-50 to-white">
          <Container maxWidth="7xl" className="px-4 md:px-6 lg:px-8">
            <Stack spacing="xl" align="center" className="mb-12 sm:mb-16 md:mb-20 px-4">
              <Heading as="h2" size="4xl" align="center">
                Choose Your Perfect Template
              </Heading>
              <Text size="xl" align="center" className="max-w-2xl text-base sm:text-lg md:text-xl lg:text-xl">
                Select from our collection of professionally designed templates
              </Text>
            </Stack>
            
            <Grid cols={1} mdCols={3} gap="lg" className="md:gap-xl">
              <Card className="bg-white hover:shadow-2xl transition-all transform hover:-translate-y-2" padding="none">
                <Box className="h-48 md:h-56 bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Icon emoji="👨‍💻" size="2xl" className="md:text-4xl" />
                </Box>
                <Stack spacing="md" className="p-4 md:p-6">
                  <Heading as="h3" size="2xl" className="text-lg md:text-xl">Software Engineer</Heading>
                  <Text className="text-sm md:text-base mb-4">Perfect for developers and tech professionals</Text>
                  <Link href="/templates" variant="primary">View Template →</Link>
                </Stack>
              </Card>
              
              <Card className="bg-white hover:shadow-2xl transition-all transform hover:-translate-y-2" padding="none">
                <Box className="h-48 md:h-56 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Icon emoji="📱" size="2xl" className="md:text-4xl" />
                </Box>
                <Stack spacing="md" className="p-4 md:p-6">
                  <Heading as="h3" size="2xl" className="text-lg md:text-xl">Marketing Professional</Heading>
                  <Text className="text-sm md:text-base mb-4">Showcase campaigns and creative work</Text>
                  <Link href="/templates" variant="primary">View Template →</Link>
                </Stack>
              </Card>
              
              <Card className="bg-white hover:shadow-2xl transition-all transform hover:-translate-y-2" padding="none">
                <Box className="h-48 md:h-56 bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                  <Icon emoji="💼" size="2xl" className="md:text-4xl" />
                </Box>
                <Stack spacing="md" className="p-4 md:p-6">
                  <Heading as="h3" size="2xl" className="text-lg md:text-xl">General Professional</Heading>
                  <Text className="text-sm md:text-base mb-4">Versatile template for any profession</Text>
                  <Link href="/templates" variant="primary">View Template →</Link>
                </Stack>
              </Card>
            </Grid>
          </Container>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-12 sm:py-20 md:py-24 lg:py-24 bg-white">
          <Container maxWidth="7xl" className="px-4 md:px-6 lg:px-8">
            <Stack spacing="xl" align="center" className="mb-12 sm:mb-16 md:mb-20 px-4">
              <Heading as="h2" size="4xl" align="center">
                Get Started in 3 Simple Steps
              </Heading>
              <Text size="xl" align="center" className="max-w-2xl text-base sm:text-lg md:text-xl lg:text-xl">
                Your professional portfolio is just minutes away
              </Text>
            </Stack>
            
            <Grid cols={1} mdCols={3} gap="xl" className="md:gap-2xl">
              <Stack spacing="md" align="center" className="p-4 md:p-6">
                <Box className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <Text as="span" className="text-white text-3xl md:text-4xl font-bold">1</Text>
                </Box>
                <Heading as="h3" size="2xl" align="center" className="text-lg md:text-xl">Choose a Template</Heading>
                <Text align="center" className="leading-relaxed text-sm md:text-base">
                  Browse our collection and select the template that best fits your professional style.
                </Text>
              </Stack>
              
              <Stack spacing="md" align="center" className="p-4 md:p-6">
                <Box className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                  <Text as="span" className="text-white text-3xl md:text-4xl font-bold">2</Text>
                </Box>
                <Heading as="h3" size="2xl" align="center" className="text-lg md:text-xl">Customize Your Content</Heading>
                <Text align="center" className="leading-relaxed text-sm md:text-base">
                  Fill in your information using our simple form editor. Add your projects, skills, and more.
                </Text>
              </Stack>
              
              <Stack spacing="md" align="center" className="p-4 md:p-6">
                <Box className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-pink-600 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                  <Text as="span" className="text-white text-3xl md:text-4xl font-bold">3</Text>
                </Box>
                <Heading as="h3" size="2xl" align="center" className="text-lg md:text-xl">Publish & Share</Heading>
                <Text align="center" className="leading-relaxed text-sm md:text-base">
                  Hit publish and share your unique portfolio link with employers, clients, and your network.
                </Text>
              </Stack>
            </Grid>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-20 md:py-24 lg:py-24 bg-gradient-to-r from-indigo-600 to-purple-600">
          <Container maxWidth="4xl" className="px-4 md:px-6 lg:px-8">
            <Stack spacing="lg" align="center" className="px-4">
              <Heading as="h2" size="4xl" align="center" className="text-white">
                {isAuthenticated ? 'Manage Your Portfolios' : 'Ready to Build Your Portfolio?'}
              </Heading>
              <Text size="xl" align="center" className="text-indigo-100 text-base sm:text-lg md:text-xl lg:text-xl">
                {isAuthenticated 
                  ? 'Access your dashboard to view, edit, and manage all your portfolios'
                  : 'Join professionals worldwide who are showcasing their work beautifully'
                }
              </Text>
              <Link href={isAuthenticated ? '/dashboard' : '/register'}>
                <Button variant="outline" size="lg" className="bg-white text-indigo-600 hover:shadow-2xl px-6 md:px-8 py-3 md:py-4">
                  {isAuthenticated ? 'Go to Dashboard' : 'Get Started for Free'}
                </Button>
              </Link>
            </Stack>
          </Container>
        </section>
      </main>

      {/* Footer */}
      <Box as="footer" bg="bg-gray-900" className="text-white py-12 sm:py-16 md:py-20 lg:py-20">
        <Container maxWidth="7xl" className="px-4 md:px-6 lg:px-8">
          <Grid cols={1} smCols={2} mdCols={4} gap="lg" className="md:gap-xl mb-8">
            <Stack spacing="md">
              <Heading as="h3" size="2xl" gradient className="mb-0">
                Portfolio Builder
              </Heading>
              <Text className="text-gray-400 text-sm sm:text-base md:text-base">
                Create stunning portfolios in minutes without any coding.
              </Text>
            </Stack>
            
            <Stack spacing="md">
              <Heading as="h4" size="md" weight="semibold" className="text-white">Product</Heading>
              <Stack spacing="sm">
                <Link href="/templates" variant="subtle">Templates</Link>
                <Link href="#features" variant="subtle">Features</Link>
                <Link href="#how-it-works" variant="subtle">How It Works</Link>
              </Stack>
            </Stack>
            
            <Stack spacing="md">
              <Heading as="h4" size="md" weight="semibold" className="text-white">Company</Heading>
              <Stack spacing="sm">
                <Link href="#" variant="subtle" external>About</Link>
                <Link href="#" variant="subtle" external>Blog</Link>
                <Link href="#" variant="subtle" external>Contact</Link>
              </Stack>
            </Stack>
            
            <Stack spacing="md">
              <Heading as="h4" size="md" weight="semibold" className="text-white">Legal</Heading>
              <Stack spacing="sm">
                <Link href="#" variant="subtle" external>Privacy</Link>
                <Link href="#" variant="subtle" external>Terms</Link>
              </Stack>
            </Stack>
          </Grid>
          
          <Box className="border-t border-gray-800 pt-8 mt-8">
            <Flex justify="between" align="center" className="flex-col md:flex-row gap-4">
              <Text variant="caption" className="text-gray-400 text-center md:text-left">
                &copy; 2025 Portfolio Builder. All rights reserved.
              </Text>
              <Flex gap="lg" className="flex-wrap justify-center">
                <Link href="#" variant="subtle" external>Twitter</Link>
                <Link href="#" variant="subtle" external>GitHub</Link>
                <Link href="#" variant="subtle" external>LinkedIn</Link>
              </Flex>
            </Flex>
          </Box>
        </Container>
      </Box>
    </div>
  );
}
