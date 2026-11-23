/*
  CURSOS E CERTIFICAÇÕES
  ----------------------
  Para adicionar um curso, copie um bloco { ... }, cole no topo da lista e edite.
  A página ordena por data (mais recente primeiro) e soma as horas sozinha.

  area:   "Front-End" | "Back-End" | "Dados" | "Fundamentos" | "Eventos"
          (pode criar outra; o filtro aparece automaticamente)
  data:   "AAAA-MM" (ano e mês de conclusão)
  horas:  número (só o número)
  link:   endereço para verificar o certificado (ou "" se não tiver)
*/
const CURSOS = [
  {
    titulo: 'Minicurso React Native',
    instituicao: 'Rocketseat',
    area: 'Front-End',
    horas: 5,
    data: '2026-09',
    temas: ['React Native', 'Expo Router', 'AsyncStorage', 'TypeScript'],
    link: 'https://app.rocketseat.com.br/certificates/aee8341a-7953-43ec-b17c-795b3a64b6ea'
  },
  {
    titulo: 'Ciência da Computação de Harvard no Brasil',
    instituicao: 'Fundação Estudar',
    area: 'Fundamentos',
    horas: 70,
    data: '2026-09',
    temas: ['Fundamentos de computação', 'Lógica de programação'],
    link: ''
  },
  {
    titulo: 'Angular — Curso Introdutório',
    instituicao: 'Rocketseat',
    area: 'Front-End',
    horas: 11,
    data: '2026-07',
    temas: ['Angular', 'RxJS', 'Formulários reativos', 'Roteamento'],
    link: 'https://app.rocketseat.com.br/certificates/91f18f5f-3f9a-4468-a692-f94af743f604'
  },
  {
    titulo: 'Clean Code — Python',
    instituicao: 'Rocketseat',
    area: 'Back-End',
    horas: 13,
    data: '2026-07',
    temas: ['SOLID', 'MVC', 'Pydantic', 'Testes unitários', 'Mocks'],
    link: 'https://app.rocketseat.com.br/certificates/33a5df04-68b1-45ba-9ef5-f9d3a7a5b19c'
  },
  {
    titulo: 'Sistemas Computacionais',
    instituicao: 'UNIFACS',
    area: 'Fundamentos',
    horas: 160,
    data: '2025-12',
    temas: ['Arquitetura de computadores', 'Analista de sistemas computacionais'],
    link: 'https://cloudapp.animaeducacao.com.br/validador-documento/?code=71723ab7575b456f8f96c18187ee5666'
  },
  {
    titulo: 'Hackathon CARF 2025',
    instituicao: 'Escola de Administração da UFBA',
    area: 'Eventos',
    horas: 50,
    data: '2025-10',
    temas: ['Hackathon', '100% de frequência', 'Nota 10'],
    link: ''
  },
  {
    titulo: 'Jovem Aprendiz — Administrador de Banco de Dados',
    instituicao: 'CIEE',
    area: 'Dados',
    horas: 400,
    data: '2024-11',
    temas: ['Banco de dados', '400h teóricas + 1.440h práticas'],
    link: ''
  }
];
