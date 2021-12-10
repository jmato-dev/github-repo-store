

# Notas sobre o curso Introdução ao Git e ao GitHub



Notas uteis pra **minha pessoa** sobre o curso.



## 3.3 - Chave SSH e Token



Ao gerar o par de chaves o **"ce"** antes do endereço de e-mail é maiúsculo, de outra forma o comando falha com a mensagem "too many arguments".

`usario@computador$ ssh-keygen -t ed25519 -C endereço@email`



#### Referencias

- [ssh-keygen](https://linux.die.net/man/1/ssh-keygen)
- [StackOveflow](https://pt.stackoverflow.com/questions/303078/n%C3%A3o-consigo-gerar-o-a-chave-rsa-para-o-github-too-many-arguments)





Aparentemente toda vez que for usar github com o ssh-agent é preciso iniciar o ssh-agent desde o GitBash e adicionar a chave privada. Não sei se o ultimo passo é por conta que dei um nome diferente pras chaves.

`usario@computador$ eval $(ssh-agent -s)`

`usario@computador$ ssh-add /caminho/pra/chave/privada`



#### Referencias

- 13:10 no vídeo
- [ssh-agent(1)](https://linux.die.net/man/1/ssh-agent)
- [ssh-add(1)](https://linux.die.net/man/1/ssh-add)

