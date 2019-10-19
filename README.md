# PROXY REVERSO BROWSERSYNC E MINIFICAÇÃO DE ARQUIVOS E IMAGENS
**fazer alterações de CSS ou JS em um site vtex Nesse caso, você sabe o quanto isso pode ser chato**


###Este é um simples Gulpfile baseado em BrowserSync que proxies um site remoto localmente e injeta um ou mais arquivos CSS e JS locais especificados, observa as alterações nesses arquivos locais e atualiza automaticamente o navegador enquanto você codifica.

CSS e JS funcionando localmente, veja-o aplicado imediatamente ao servidor remoto (dentro do razoável), depois de pronto o *.css e *.js faça o upload.



```javascript
var config = {
  remoteURL: 'https://www.poemese.com/',  //  TROCAR URL
  srcDir: './src',
  injectDir: './build',
  localPath: '/local-assets',
  localAssets: {
    css: [
      'css/**/*.css'
    ],
    js: [
      'js/**/*.js'
    ]
  }
};
```


### COMEÇANDO

*Pré- requisito  ter instalado Node, NPM  e Gulp*

Primeiro, instalando as dependencias:

```
$ npm install
```

O arquivo Gulpfile's possui as  task  que irão rodar no BrowserSync realizando o  proxy  e  olhando as modificações the *.CSS and *.JS,  só é necessário  rodar o comando abaixo:

```
$ gulp
```
