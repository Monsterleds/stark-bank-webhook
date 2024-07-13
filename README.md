
# Stark Bank - Back End Developer

A aplicação foi feita com express com uma estrutura muito direta dado o tamanho e o quão escalável ela é.

Adicionei alguns possíveis comentários @todo no código de futuras melhorias, por exemplo, dado que estamos lidando com dados sensíveis (pagamento de faturas e trasferências) talvez salvar esses dados em uma fila com uma "Dead-letter-queue (DLQ)" para preservar a consistência dos dados. Além de possíveis melhorias nos testes em que os arquivos poderiam ser isolados (arquivos de mock) para ter uma precisão maior ou ter adicionado testes E2E, muitas possibilidades...

Sobre as libs, usei **Express** sem nenhum tipo de favorítismo, independente de ser fastify ou até mesmo usar uma framework (Nestjs/Adonis), era apenas um teste, então por isso não vi necessidade de criar um DDDzao da vida com mais meia dúzia de conceitos e boas práticas na qual uso no meu dia a dia.

Em relação ao Deploy estou usando o GitHub Actions para fazer os processos de **CI/CD** para subir na **AWS**.

Na cloud está sendo usado o **Elastic Beanstalk** integrando loadbalancers para fazer o gerenciamento de carga das instâncias **EC2** (atrelados em suas VPC's e subnets) junto com certificados SSL's da própria amazon com um domínio comprado (de 5 reais, vou cobrar em kk) da godaddy.

Em relação aos secrets, **chave privada/pública** foi salva no **Parameter Store** da própria **AWS** (ideal usar o secret manager mas é bem caro), assim, garantindo segurança e impedindo versionamento das chaves nas aplicações.

Tem outras coisas, mas por hoje é só...

Qualquer dúvida, só entrar em contato.