/*
  CURSOS E CERTIFICAÇÕES
  ----------------------
  Para adicionar um curso, copie um bloco { ... }, cole no topo da lista e edite.
  A página ordena por data (mais recente primeiro) e soma as horas sozinha.

  area:   "Front-End" | "Back-End" | "Dados" | "Fundamentos" | "Eventos"
          (pode criar outra; o filtro aparece automaticamente)
  data:   "AAAA-MM" (ano e mês de conclusão) — pode deixar "" se não lembrar
  horas:  número (só o número)
  link:   endereço para verificar o certificado (ou "" se não tiver)
*/
const CURSOS = [
  {
    titulo: 'Introdução à Ciência de Dados',
    instituicao: 'IFMS',
    area: 'Dados',
    horas: 45,
    data: '2026-10',
    temas: ['Ciência de dados', 'Análise de dados'],
    link: 'http://verifica.ifms.edu.br/cursoslivres/26b589f2-d875-4cf0-b8ae-cb62c9eecfca'
  },
  {
    titulo: 'Ânima Tech Week XII',
    instituicao: 'Ecossistema Ânima de Educação',
    area: 'Eventos',
    horas: 9,
    data: '2026-09',
    temas: ['Evento de tecnologia', 'Palestras e atividades'],
    link: 'https://eventosanima.com.br/techweekXII/verificarCertificado.php?t=*7FD31C40CD6F6F1CB8F0B89AC1BCAC04F8344833'
  },
  {
    titulo: 'Fenômenos Elétricos, Magnéticos e Oscilatórios',
    instituicao: 'UNIFACS',
    area: 'Fundamentos',
    horas: 160,
    data: '2025-07',
    temas: ['Física para engenharia', 'Eletromagnetismo'],
    link: 'https://cloudapp.animaeducacao.com.br/validador-documento/?code=6062343d57184b73840759a6a7b8b5a8'
  },
  {
    titulo: 'Modelagem e Simulação de Sistemas Elétricos e Magnéticos',
    instituicao: 'UNIFACS',
    area: 'Fundamentos',
    horas: 160,
    data: '2025-07',
    temas: ['Modelagem matemática', 'Simulação de sistemas'],
    link: 'https://cloudapp.animaeducacao.com.br/validador-documento/?code=66b5644c1f914e4c8f42f47b15ae035c'
  },
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
  },
  // ----- Cursos do currículo sem certificado encontrado (preencha a data quando souber) -----
  {
    titulo: 'Segurança em Sistemas Computacionais',
    instituicao: 'UNIFACS',
    area: 'Segurança',
    horas: 160,
    data: '2026-07',
    temas: ['Segurança', 'Analista de Sistemas Computacionais e Segurança'],
    link: 'https://cloudapp.animaeducacao.com.br/validador-documento/?code=c916508883c64912ae34cfbc08595167'
  },
  {
    titulo: 'Sistemas de Comunicação e Redes',
    instituicao: 'UNIFACS',
    area: 'Redes',
    horas: 160,
    data: '2025-12',
    temas: ['Redes', 'Cabeamento', 'Nuvem', 'Analista de redes de computadores'],
    link: 'https://cloudapp.animaeducacao.com.br/validador-documento/?code=98a1dba7d62a40c4bfa66379e1d690a6'
  },
  {
    titulo: 'Usabilidade, Desenvolvimento Web, Mobile e Jogos',
    instituicao: 'UNIFACS',
    area: 'Front-End',
    horas: 160,
    data: '2026-07',
    temas: ['Usabilidade', 'Web', 'Mobile', 'Jogos'],
    link: 'https://cloudapp.animaeducacao.com.br/validador-documento/?code=107a6bbdaade475bb2c2f52f7dfd6942'
  },
  {
    titulo: 'Linguagem de Programação Python — Básico',
    instituicao: 'Fundação Bradesco',
    area: 'Back-End',
    horas: 18,
    data: '',
    temas: ['Python'],
    link: ''
  },
  {
    titulo: 'HTML e CSS Essencial — Front-End Completo para Iniciantes',
    instituicao: 'Udemy',
    area: 'Front-End',
    horas: 14,
    data: '',
    temas: ['HTML', 'CSS'],
    link: ''
  },
  {
    titulo: 'Segurança em Tecnologia da Informação',
    instituicao: 'Fundação Bradesco',
    area: 'Segurança',
    horas: 12,
    data: '',
    temas: ['Segurança da informação'],
    link: ''
  },
  {
    titulo: 'Introdução à Programação Orientada a Objetos — POO',
    instituicao: 'Fundação Bradesco',
    area: 'Fundamentos',
    horas: 5,
    data: '',
    temas: ['POO'],
    link: ''
  }
];
