export type PublishedStatus = "DRAFT" | "UNACTIVE" | "ACTIVE";
export type UserRole = "ADM" | "PBR";

export interface DataAuthor {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

export interface DataPost {
  id: number;
  title: string;
  slug: string;
  thumbnail: string | null;
  content: string;
  published: PublishedStatus;
  slide: boolean;
  highlight: boolean;
  scheduledAt: string;
  createdAt: string;
  updatedAt: string;
  author: DataAuthor;
}

export interface DataCategory {
  id: number;
  name: string;
  slug: string;
  posts: DataPost[];
}

export interface DataProps {
  categories: DataCategory[];
}

const author: DataAuthor = {
  id: 1,
  name: "Administrador",
  email: "admin@portal.com",
  role: "ADM",
};

export const data: DataProps = {
  categories: [
    {
      id: 1,
      name: "Política",
      slug: "política",
      posts: [],
    },
    {
      id: 2,
      name: "Economia",
      slug: "economia",
      posts: [
        {
          id: 13,
          title: "Inflação apresenta sinais de desaceleração e mercado acompanha próximos indicadores",
          slug: "inflacao-apresenta-sinais-de-desaceleracao-e-mercado-acompanha-proximos-indicadores",
          thumbnail: "1785357523807-388310823.jpeg",
          content:
            "<p>Os últimos indicadores econômicos apontam uma desaceleração gradual da inflação em diversos setores da economia. Especialistas afirmam que a estabilidade dos preços pode favorecer o consumo das famílias e estimular novos investimentos.<br><br>Apesar do cenário positivo, analistas destacam que decisões sobre juros e políticas fiscais continuarão influenciando o comportamento do mercado ao longo dos próximos meses.<br></p>",
          published: "ACTIVE",
          slide: true,
          highlight: false,
          scheduledAt: "2026-07-22T20:39:00.000Z",
          createdAt: "2026-07-29T20:39:36.504Z",
          updatedAt: "2026-09-30T19:43:28.305Z",
          author,
        },
        {
          id: 14,
          title: "Pequenos negócios investem em tecnologia ",
          slug: "pequenos-negocios-investem-em-tecnologia",
          thumbnail: "1785357674474-510284059.jpg",
          content:
            "<p><br>Empresas de pequeno porte vêm adotando soluções digitais para automatizar processos e reduzir custos operacionais. Ferramentas de gestão financeira, atendimento automatizado e análise de dados estão entre as principais escolhas.<br><br>A expectativa é que a transformação digital continue impulsionando a competitividade das empresas nos próximos anos.<br><br></p>",
          published: "ACTIVE",
          slide: true,
          highlight: false,
          scheduledAt: "2026-07-30T20:41:00.000Z",
          createdAt: "2026-07-29T20:42:01.346Z",
          updatedAt: "2026-09-29T11:36:51.758Z",
          author,
        },
        {
          id: 37,
          title: "Incentivos Fiscais Impulsionam Investimentos em Energia Renovável no Brasil",
          slug: "incentivos-fiscais-impulsionam-investimentos-em-energia-renovavel-no-brasil",
          thumbnail: "1790794875011-122687035.jpeg",
          content:
            "<p><br></p><p>O setor de energia renovável no Brasil registrou um crescimento recorde no último trimestre, impulsionado por novas políticas de incentivo fiscal e pela expansão de projetos de energia solar e eólica. Segundo dados do Ministério da Economia, o volume de investimentos privados direcionados à transição energética aumentou 18% em comparação ao mesmo período do ano anterior, consolidando o país como um dos principais polos de atração de capital verde na América Latina.</p><p>Especialistas apontam que a combinação de segurança jurídica, demanda industrial por fontes limpas e linhas de crédito sustentáveis tem sido decisiva para atrair multinacionais e fundos de investimento internacionais. Com o avanço das obras em parques solares no Nordeste e complexos eólicos no Sul, a expectativa é que o setor gere milhares de empregos diretos e indiretos nos próximos anos, além de fortalecer a matriz elétrica nacional contra oscilações climáticas.</p>",
          published: "ACTIVE",
          slide: true,
          highlight: false,
          scheduledAt: "2026-09-30T17:00:00.000Z",
          createdAt: "2026-09-30T19:01:44.757Z",
          updatedAt: "2026-10-01T18:33:54.887Z",
          author,
        },
      ],
    },
    {
      id: 3,
      name: "Saúde",
      slug: "saúde",
      posts: [
        {
          id: 3,
          title: "Pesquisa revela avanços no tratamento contra doenças cardiovasculares",
          slug: "pesquisa-revela-avancos-no-tratamento-contra-doencas-cardiovasculares",
          thumbnail: "p3.webp",
          content:
            "Pesquisadores apresentaram resultados promissores em estudos relacionados ao tratamento de doenças cardiovasculares. As novas abordagens combinam medicamentos de última geração com monitoramento contínuo dos pacientes.Segundo os especialistas, os testes demonstraram melhora na recuperação e redução de complicações em grupos acompanhados durante vários meses.Embora sejam necessários novos estudos para confirmar os resultados em larga escala, os avanços representam uma perspectiva positiva para milhões de pessoas.",
          published: "ACTIVE",
          slide: false,
          highlight: false,
          scheduledAt: "2026-07-13T19:47:00.000Z",
          createdAt: "2026-07-13T19:47:25.333Z",
          updatedAt: "2026-09-29T10:22:12.905Z",
          author,
        },
        {
          id: 5,
          title: "Projeto amplia áreas de reflorestamento em regiões urbanas",
          slug: "projeto-amplia-areas-de-reflorestamento-em-regioes-urbanas",
          thumbnail: "p5.webp",
          content:
            "Programas de reflorestamento vêm transformando espaços urbanos em diversas cidades brasileiras. O plantio de árvores contribui para reduzir a temperatura, melhorar a qualidade do ar e ampliar áreas de convivência.Além dos benefícios ambientais, iniciativas desse tipo fortalecem a educação ambiental e incentivam a participação da população na preservação da natureza.Organizações públicas e privadas planejam expandir o número de áreas verdes nos próximos anos.",
          published: "ACTIVE",
          slide: false,
          highlight: false,
          scheduledAt: "2026-07-13T19:47:00.000Z",
          createdAt: "2026-07-13T19:47:25.333Z",
          updatedAt: "2026-09-29T10:22:35.554Z",
          author,
        },
        {
          id: 8,
          title: "Campanha incentiva vacinação nos hospitais",
          slug: "campanha-incentiva-vacinacao-nos-hospitais",
          thumbnail: "p8.webp",
          content:
            "Autoridades de saúde reforçaram campanhas de vacinação para reduzir a circulação de doenças respiratórias durante os períodos de maior incidência.Além da imunização, profissionais recomendam hábitos como higiene das mãos, ventilação dos ambientes e atenção aos sintomas persistentes.A expectativa é ampliar a cobertura vacinal e reduzir o número de internações.",
          published: "ACTIVE",
          slide: false,
          highlight: false,
          scheduledAt: "2026-07-13T22:47:00.000Z",
          createdAt: "2026-07-13T19:47:25.333Z",
          updatedAt: "2026-09-29T10:20:05.522Z",
          author,
        },
        {
          id: 11,
          title: "Hábitos simples podem contribuir para uma rotina mais saudável",
          slug: "habitos-simples-podem-contribuir-para-uma-rotina-mais-saudavel",
          thumbnail: "1785261093109-84896290.jpg",
          content:
            "<p><strong>​Pessoa caminhando ao nascer do sol, frutas, garrafa de água, ambiente ao ar livre, fotografia realista, alta resolução.<br><br>Conteúdo<br><br>Pequenas mudanças na rotina podem trazer benefícios importantes para a saúde. Alimentação equilibrada, atividade física regular, hidratação e sono adequado estão entre as principais recomendações de profissionais.<br><br>A adoção gradual desses hábitos tende a facilitar a manutenção de um estilo de vida saudável.<br></strong><br></p>",
          published: "ACTIVE",
          slide: false,
          highlight: false,
          scheduledAt: "2026-07-29T17:50:00.000Z",
          createdAt: "2026-07-28T17:52:03.111Z",
          updatedAt: "2026-09-29T10:21:44.166Z",
          author,
        },
        {
          id: 12,
          title: "Computadores gamers evoluem com novas tecnologias de desempenho",
          slug: "computadores-gamers-evoluem-com-novas-tecnologias-de-desempenho",
          thumbnail: "1777573385646-573832284.jpg",
          content:
            "<p><br>Os computadores voltados para jogos vêm recebendo componentes cada vez mais eficientes, oferecendo melhor desempenho gráfico e tempos de resposta reduzidos.<br><br>Além do público gamer, profissionais de edição e modelagem 3D também aproveitam essas configurações avançadas.<br></p>",
          published: "ACTIVE",
          slide: false,
          highlight: false,
          scheduledAt: "2026-07-29T21:08:00.000Z",
          createdAt: "2026-07-28T18:08:54.946Z",
          updatedAt: "2026-09-28T20:36:41.740Z",
          author,
        },
      ],
    },
    {
      id: 4,
      name: "Educação",
      slug: "educação",
      posts: [
        {
          id: 15,
          title: "Métodos de aprendizagem ativa ganham espaço nas escolas",
          slug: "metodos-de-aprendizagem-ativa-ganham-espaco-nas-escolas",
          thumbnail: "1785357782443-695178665.jpg",
          content:
            "<p>As metodologias ativas colocam os estudantes como protagonistas do processo de aprendizagem. Em vez de apenas assistir às aulas, os alunos desenvolvem projetos, resolvem problemas e participam de debates.<br><br>Especialistas afirmam que esse modelo contribui para o desenvolvimento do pensamento crítico e da criatividade.<br><br></p>",
          published: "ACTIVE",
          slide: false,
          highlight: true,
          scheduledAt: "2026-08-06T20:42:00.000Z",
          createdAt: "2026-07-29T20:43:08.410Z",
          updatedAt: "2026-09-29T11:37:52.943Z",
          author,
        },
        {
          id: 16,
          title: "Uso da inteligência artificial desperta debates na educação",
          slug: "uso-da-inteligencia-artificial-desperta-debates-na-educacao",
          thumbnail: "1785954679014-579600276.jpg",
          content:
            "<p>Ferramentas baseadas em inteligência artificial passaram a fazer parte da rotina de estudantes e professores. Enquanto alguns enxergam oportunidades para personalizar o ensino, outros defendem a necessidade de estabelecer regras claras para seu uso.<br></p>",
          published: "ACTIVE",
          slide: true,
          highlight: false,
          scheduledAt: "2026-08-14T18:30:00.000Z",
          createdAt: "2026-08-05T18:31:47.204Z",
          updatedAt: "2026-09-29T11:37:18.024Z",
          author,
        },
        {
          id: 17,
          title: "Cursos online ampliam oportunidades de qualificação profissional",
          slug: "cursos-online-ampliam-oportunidades-de-qualificacao-profissional",
          thumbnail: "1785954740154-51243094.jpg",
          content:
            "<p>O crescimento das plataformas digitais facilitou o acesso à educação em diversas áreas do conhecimento. Atualmente é possível encontrar cursos sobre tecnologia, idiomas, gestão e desenvolvimento pessoal.<br><br>A flexibilidade de horários é apontada como um dos fatores que mais atraem novos estudantes.<br></p>",
          published: "ACTIVE",
          slide: false,
          highlight: true,
          scheduledAt: "2026-08-19T18:32:00.000Z",
          createdAt: "2026-08-05T18:32:48.360Z",
          updatedAt: "2026-09-29T11:37:19.860Z",
          author,
        },
      ],
    },
    {
      id: 5,
      name: "Esportes",
      slug: "esportes",
      posts: [
        {
          id: 1,
          title: "Inteligência artificial acelera diagnósticos em hospitais brasileiros",
          slug: "inteligencia-artificial-acelera-diagnosticos-em-hospitais-brasileiros",
          thumbnail: "p1.webp",
          content:
            "Hospitais brasileiros vêm ampliando o uso de sistemas baseados em inteligência artificial para auxiliar médicos na análise de exames e identificação de doenças. A tecnologia permite comparar milhares de imagens médicas em poucos segundos, oferecendo sugestões que apoiam o diagnóstico clínico.Especialistas afirmam que a inteligência artificial não substitui os profissionais da saúde, mas atua como uma ferramenta complementar capaz de aumentar a precisão dos resultados e reduzir o tempo de atendimento.Além da radiologia, hospitais também utilizam algoritmos para prever riscos de internação, acompanhar pacientes crônicos e organizar filas de atendimento. O avanço tecnológico deve impulsionar novos investimentos no setor nos próximos anos.",
          published: "ACTIVE",
          slide: false,
          highlight: false,
          scheduledAt: "2026-07-13T22:47:00.000Z",
          createdAt: "2026-07-13T19:47:25.333Z",
          updatedAt: "2026-09-29T10:11:47.428Z",
          author,
        },
        {
          id: 2,
          title: "Pequenas empresas registram crescimento ",
          slug: "pequenas-empresas-registram-crescimento",
          thumbnail: "p2.webp",
          content:
            "<p>O comércio eletrônico continua sendo uma importante fonte de crescimento para pequenos negócios. Dados recentes mostram aumento significativo no volume de pedidos realizados pela internet durante o primeiro semestre.Empreendedores têm investido em redes sociais, marketplaces e lojas próprias para alcançar novos consumidores. A facilidade dos meios de pagamento e a melhoria na logística contribuíram para o aumento das vendas.Especialistas destacam que oferecer atendimento rápido, boas descrições de produtos e entrega eficiente tornou-se um diferencial competitivo para empresas de todos os segmentos.</p>",
          published: "ACTIVE",
          slide: false,
          highlight: false,
          scheduledAt: "2026-07-13T22:47:00.000Z",
          createdAt: "2026-07-13T19:47:25.333Z",
          updatedAt: "2026-09-29T10:11:46.420Z",
          author,
        },
        {
          id: 4,
          title: "Clube conquista vitória histórica em campeonato nacional",
          slug: "clube-conquista-vitoria-historica-em-campeonato-nacional",
          thumbnail: "p4.webp",
          content:
            "Uma partida emocionante marcou mais uma rodada do campeonato nacional. O clube venceu por um placar expressivo após uma atuação consistente durante os noventa minutos.A equipe dominou a posse de bola, criou diversas oportunidades e garantiu a vitória com gols marcados na segunda etapa.O resultado fortalece a campanha do time e aumenta a expectativa da torcida para as próximas rodadas da competição.",
          published: "UNACTIVE",
          slide: false,
          highlight: false,
          scheduledAt: "2026-07-13T19:47:00.000Z",
          createdAt: "2026-07-13T19:47:25.333Z",
          updatedAt: "2026-09-29T10:15:30.998Z",
          author,
        },
        {
          id: 9,
          title: "Atleta brasileiro estabelece novo recorde em competição internacional",
          slug: "atleta-brasileiro-estabelece-novo-recorde-em-competicao-internacional",
          thumbnail: "p9.webp",
          content:
            "O esporte brasileiro conquistou mais um resultado expressivo em uma importante competição internacional.Após meses de preparação intensa, o atleta superou o recorde anterior e garantiu lugar entre os destaques do torneio.Treinadores ressaltaram o planejamento realizado durante toda a temporada e comemoraram o desempenho alcançado.",
          published: "UNACTIVE",
          slide: false,
          highlight: false,
          scheduledAt: "2026-07-13T19:47:00.000Z",
          createdAt: "2026-07-13T19:47:25.333Z",
          updatedAt: "2026-09-29T10:15:29.185Z",
          author,
        },
        {
          id: 18,
          title: "Treinos funcionais conquistam praticantes de todas as idades",
          slug: "treinos-funcionais-conquistam-praticantes-de-todas-as-idades",
          thumbnail: "1785954803529-199809392.jpeg",
          content:
            "<p>Os treinos funcionais combinam força, equilíbrio e resistência física em exercícios variados. A modalidade ganhou popularidade por atender desde iniciantes até atletas experientes.<br><br>Profissionais recomendam acompanhamento especializado para melhores resultados.<br></p>",
          published: "ACTIVE",
          slide: false,
          highlight: false,
          scheduledAt: "2026-08-14T18:33:00.000Z",
          createdAt: "2026-08-05T18:33:46.186Z",
          updatedAt: "2026-09-29T10:14:05.965Z",
          author,
        },
        {
          id: 19,
          title: "Tecnologia transforma a análise de desempenho no esporte",
          slug: "tecnologia-transforma-a-analise-de-desempenho-no-esporte",
          thumbnail: "1785954878403-526373234.png",
          content:
            "<p>Equipamentos inteligentes vêm permitindo avaliações detalhadas sobre velocidade, frequência cardíaca e recuperação física dos atletas.<br><br>Esses recursos ajudam equipes técnicas a elaborar treinamentos mais eficientes e reduzir riscos de l<br></p>",
          published: "ACTIVE",
          slide: false,
          highlight: false,
          scheduledAt: "2026-08-22T18:34:00.000Z",
          createdAt: "2026-08-05T18:35:05.318Z",
          updatedAt: "2026-09-29T10:15:37.242Z",
          author,
        },
      ],
    },
    {
      id: 6,
      name: "Natureza",
      slug: "natureza",
      posts: [
        {
          id: 6,
          title: "Startups brasileiras atraem novos investimentos em inovação",
          slug: "startups-brasileiras-atraem-novos-investimentos-em-inovacao",
          thumbnail: "p6.webp",
          content:
            "O ecossistema de startups continua demonstrando crescimento com a chegada de novos investidores interessados em soluções tecnológicas.Empresas voltadas para inteligência artificial, fintechs, educação e saúde digital lideram o volume de investimentos, impulsionando a geração de empregos especializados.Analistas acreditam que o ambiente favorável à inovação continuará estimulando novos empreendimentos.",
          published: "ACTIVE",
          slide: false,
          highlight: false,
          scheduledAt: "2026-07-13T19:47:00.000Z",
          createdAt: "2026-07-13T19:47:25.333Z",
          updatedAt: "2026-09-29T10:20:36.044Z",
          author,
        },
        {
          id: 7,
          title: "Mercado financeiro encerra com desempenho positivo",
          slug: "mercado-financeiro-encerra-com-desempenho-positivo",
          thumbnail: "p7.webp",
          content:
            "O mercado financeiro registrou uma semana de valorização impulsionada por indicadores econômicos favoráveis e expectativas positivas dos investidores.Especialistas destacam que setores ligados à tecnologia e infraestrutura apresentaram desempenho acima da média, contribuindo para o avanço dos principais índices.Apesar do cenário otimista, analistas recomendam cautela diante das oscilações do mercado internacional.",
          published: "ACTIVE",
          slide: false,
          highlight: false,
          scheduledAt: "2026-07-13T22:47:00.000Z",
          createdAt: "2026-07-13T19:47:25.333Z",
          updatedAt: "2026-09-29T10:19:38.665Z",
          author,
        },
        {
          id: 10,
          title: "Energia solar cresce como alternativa sustentável para residências",
          slug: "energia-solar-cresce-como-alternativa-sustentavel-para-residencias",
          thumbnail: "p10.webp",
          content:
            "A instalação de sistemas de energia solar em residências continua crescendo devido à busca por economia e sustentabilidade.Os equipamentos tornaram-se mais acessíveis nos últimos anos, permitindo que um número maior de famílias produza parte da própria energia elétrica.Especialistas afirmam que a expansão da geração distribuída deve continuar impulsionando investimentos em tecnologias renováveis e contribuindo para a redução das emissões de carbono.",
          published: "ACTIVE",
          slide: false,
          highlight: true,
          scheduledAt: "2026-07-13T19:47:00.000Z",
          createdAt: "2026-07-13T19:47:25.333Z",
          updatedAt: "2026-09-29T10:21:13.565Z",
          author,
        },
        {
          id: 21,
          title: "Parques naturais atraem visitantes em busca de natureza",
          slug: "parques-naturais-atraem-visitantes-em-busca-de-natureza",
          thumbnail: "1786634116875-520382041.jpg",
          content:
            "<p>O ecoturismo continua crescendo entre pessoas interessadas em experiências ao ar livre. Trilhas, cachoeiras e áreas de conservação oferecem oportunidades para lazer e conscientização ambiental.<br><br>Especialistas reforçam a importância do turismo responsável para preservar esses espaços.<br></p>",
          published: "ACTIVE",
          slide: false,
          highlight: false,
          scheduledAt: "2026-08-14T12:15:00.000Z",
          createdAt: "2026-08-13T15:15:28.540Z",
          updatedAt: "2026-09-29T10:19:37.723Z",
          author,
        },
      ],
    },
    {
      id: 7,
      name: "Tecnologia",
      slug: "tecnologia",
      posts: [
        {
          id: 22,
          title: "Universo dos quadrinhos continua inspirando filmes e séries",
          slug: "universo-dos-quadrinhos-continua-inspirando-filmes-e-series",
          thumbnail: "1787859852229-87786425.jpg",
          content:
            "<p>Os quadrinhos permanecem como uma importante fonte de inspiração para produções audiovisuais. Personagens clássicos e histórias inéditas conquistam públicos de diferentes gerações.<br></p>",
          published: "ACTIVE",
          slide: false,
          highlight: true,
          scheduledAt: "2026-08-06T12:00:00.000Z",
          createdAt: "2026-08-27T19:44:23.323Z",
          updatedAt: "2026-09-29T10:17:31.582Z",
          author,
        },
        {
          id: 24,
          title: "Robótica desperta interesse entre jovens apaixonados por tecnologia",
          slug: "robotica-desperta-interesse-entre-jovens-apaixonados-por-tecnologia",
          thumbnail: "1787949246582-73549140.jpg",
          content:
            "<p>Projetos de robótica estimulam conhecimentos em programação, eletrônica e engenharia de forma prática e colaborativa.<br><br>Escolas e centros tecnológicos vêm ampliando oficinas e competições para incentivar a participação de estudantes interessados na área.<br></p>",
          published: "ACTIVE",
          slide: true,
          highlight: false,
          scheduledAt: "2026-08-28T12:00:00.000Z",
          createdAt: "2026-08-28T20:36:04.145Z",
          updatedAt: "2026-09-30T20:43:07.535Z",
          author,
        },
      ],
    },
  ],
};

export const categories = data.categories;

export const posts = data.categories.flatMap((category) =>
  category.posts.map((post) => ({ ...post, categoryId: category.id, categoryName: category.name }))
);
