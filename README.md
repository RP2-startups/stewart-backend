# Instruções

Para rodar o backend, é necessário ter instalado:
- postgresql instalado
- yarn,npm

Ter configurado:
- .env com as variáveis de ambiente (há um arquivo .env.example a ser preenchido)

Para rodar:
- yarn dev

Se quiser realizar um "run limpo" do backend, deve-se:
- Apagar tudo da tabela SequelizeMeta
- Apagar todas as tabelas
- Apagar a pasta jsToTsDist antes de rodar de novo

Para testar as rotas, pode-se usar o Insomnia com o Insomnia_2022-12-04.json na raíz do repositório;

Padrões de retorno:
- Se sucesso, retorna status 200/201 com retorno esperado;
- Se erro, retorna status 400/401/500 com json no formato {error:e};

Breve explicação das rotas:
- POST "/user": rota de criação do usuário; deve-se enviar um multpart-formdata, com: name:string, email:string, about:string, profileImage: imagem (optional), password: string;
- POST "/login": rota de login; deve-se passar um json com name e password;
- POST "/logout": rota de logout; não precisa passar nada de body;
- GET "/user": retorna as informações do usuário, se logado; senão, retorna status 401;
- POST "/project": NECESSÁRIO ESTAR LOGADO; rota de criação de projeto; deve ser enviado um multpart-formdata com os campos: picture:image,background_picture:image,projectParticipations:Array of ProjectParticipation type (usar JSON.stringify(array)), project (atributos do projeto);
- GET "/projets": busca de projetos; deve-se passar na url um parâmetro: search_term; ex.: http://localhost:3001/projects?search_term=projeto1
- POST "/projectParticipation/accept" or "/projectParticipation/reject": NECESSÁRIO ESTAR LOGADO; deve-se passar um json no formato: {project_id:number};
- POST "/projectParticipation": NECESSÁRIO ESTAR LOGADO; cria requisições de participação no projeto para usuários; deve-se passar um Array of ProjectParticipations: {
  user_id:number,
  project_id:number,
  message?:string,
  is_adm?:boolean
}; 
campos com "?" são opcionais;
- GET "/projectParticipation": NECESSÁRIO ESTAR LOGADO: retorna todas as relações projeto <-> usuário do usuário, bem como as requisições feitas para o usuário; não é necessário enviar nada


