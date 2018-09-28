# Tello Conrtoller (Alexa�X�L��)

Alexa�X�L������g�C�h���[���uTello�v���������삷����@�ł��B  
�����|�W�g���ɂ̓G���h�|�C���g�Ŏ��s����Node.js�v���O���������Alexa�X�L���̑Θb���f��JSON���܂݂܂��B  



## �K�v�Ȃ���

* Tello  
* Alexa���ڃf�o�C�X (Amazon Echo�V���[�Y��)  
* PC (Raspberry Pi���ł���)  
* Tello�ڑ��pWi-Fi�|�[�g (USB Wi-Fi�R�l�N�^��)  



## PC��

* git ver2�ȏ�
* Node.js ver8�n
* npm ver5�n
* PC�ɂ̓O���[�o���l�b�g���[�N�ڑ��p��Tello�ւ�Wi-Fi�ڑ��p��2�̃l�b�g���[�N�|�[�g���K�v�ł�  



## �Z�b�g�A�b�v

### �G���h�|�C���g��PC��Ŏ��s

�ȉ��̃R�}���h�����s���G���h�|�C���g��PC��Ŏ��s���܂��B  

```
git clone https://github.com/miso-develop/tello-controller-alexa
cd tello-controller-alexa

npm install

node index.js
```

### ngrok�̃C���X�g�[���E���s

�ʂ̃^�[�~�i�����N�����A�����|�W�g���̃f�B���N�g���ňȉ��̃R�}���h�����s���܂��B

```
npm install -g ngrok

ngrok http 3000
```

�ȉ��̂悤�Ȍ��ʂ��Ԃ��Ă��܂��̂ŁAhttps��URL���R�s�[���܂��B

```
ngrok by @inconshreveable                                       (Ctrl+C to quit)

Session Status                online
Account                       Miso Tanaka (Plan: Free)
Version                       2.2.8
Region                        United States (us)
Web Interface                 http://127.0.0.1:4040
Forwarding                    http://xxxxxxxx.ngrok.io -> localhost:3000
Forwarding                    https://xxxxxxxx.ngrok.io -> localhost:3000

Connections                   ttl     opn     rt1     rt5     p50     p90
                              26      0       0.00    0.00    5.05    9.54
```

### Alexa�X�L���̍쐬

alexa developer console�ɂăX�L�����쐬���܂��B  

1. �u�X�L���̍쐬�v�{�^��
1. �u�X�L�����v����́i�Ȃ�ł������ł��j
1. �u�f�t�H���g�̌���v����u���{��(���{)�v��I��
1. �u�X�L�����쐬�v�{�^��

�܂�����ȃX�L����ʂɂȂ�����ȉ��̂悤�ɑ��삵�܂��B  

1. �uJSON�G�f�B�^�[�v��I��
1. model.json���h���b�O&�h���b�v
1. �u���f����ۑ��v�{�^��
1. �u���f�����r���h�v�{�^��

�Ō�ɐ�ق�ngrok�̎��s���ʂ���R�s�[����URL���G���h�|�C���g�ɐݒ肵�܂��B  

1. �u�G���h�|�C���g�v��I��
1. �uHTTPS�v��I��
1. �u�f�t�H���g�̒n��v�ɃR�s�[����URL�����
1. ���̃{�b�N�X����u�J���p�̃G���h�|�C���g�́A�ؖ��@�ւ����s�������C���ƃJ�[�h�ؖ��������h���C���̃T�u�h���C���ł��v��I��
1. �u�G���h�|�C���g��ۑ��v�{�^��

�ȏ�ŃZ�b�g�A�b�v�͊����ł��B  



### PC��Wi-Fi�ݒ�

PC��USB����Wi-Fi�R�l�N�^��ڑ����܂��B  
����ɂ��PC���̂̃l�b�g���[�N�ɉ����A�����ЂƂl�b�g���[�N���ǉ�����܂��B  
�Е����O���[�o���l�b�g���[�N�ɁA�����Е���Tello�ɐڑ����܂��B  



## �X�L���̎��s

���̏�Ԃ�Alexa�X�L�������s����ƁATello����������ł��܂��B  
