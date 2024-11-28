# OpenSSL Kurulumu - Anahtar ve Kendinden İmzalı Sertifika Oluşturma

Bu doküman, OpenSSL kurulumu için talimatları içerir. Ayrıca anahtar ve kendinden imzalı sertifika oluşturma adımları da yer alır.

Her işletim sistemi için farklı adımlar mevcuttur. Kendi ortamınıza uygun adımları seçiniz.

* [Windows](#windows)
* [Mac or Linux](#mac-or-linux)

---

## Free Book: OpenSSL Cookbook

OpenSSL hakkında ücretsiz bir kitap çevrimiçi olarak mevcuttur: [OpenSSL Cookbook, by Ivan Ristić](https://www.feistyduck.com/library/openssl-cookbook/)

---

## Windows
### Install OpenSSL
Windows için OpenSSL yüklemeniz gerekmektedir:

1. Tarayıcınızda şu bağlantıya gidin: https://slproweb.com/products/Win32OpenSSL.html
2. Sayfada bulun **"Win64 OpenSSL v3.4.0 Light"**
3. **MSI** indirme bağlantısını seçin.
4. İndirme tamamlandıktan sonra MSI dosyasını çalıştırın.
5.Kurulum sırasında tüm seçenekleri varsayılan olarak seçin.
6. Sistem ortam değişkeni yolunu OpenSSL yükleme dizinine işaret edecek şekilde güncelleyin:
a. Denetim Masası'nı açın.
b. Sistem > Gelişmiş Sistem Ayarları'nı seçin.
c. Ortam Değişkenleri'ne tıklayın.
d. Sistem değişkenleri bölümünde Path değişkenini seçip Düzenle butonuna tıklayın.
e. Path'e düzenle/ekle diyerek şunu ekleyin: c:\Program Files\OpenSSL-Win64\bin;
f. Tamam'a tıklayın ve tüm diyalog pencerelerini kapatın.

### OpenSSL Kurulumunu Doğrulama

Yeni bir komut istemi penceresi açın.
1.Şu komutu yazın:
	```
    openssl help
    ```
OpenSSL'in yüklenmiş sürümünü görürseniz kurulum başarıyla tamamlanmıştır. 🎉

### Anahtar ve Kendinden İmzalı Sertifika Oluşturma

1. Bir komut istemi penceresi açın.

2. Angular e-ticaret projenizin dizinine geçin:

    ```
    cd angular-ecommerce
    ```

3. Çıktı dosyalarınız için yeni bir dizin oluşturun:

    ```
    mkdir ssl-localhost
    ```

4. OpenSSL aracı için bir yapılandırma dosyası oluşturun:

a. `angular-ecommerce` dizininde yeni bir dosya oluşturun: `localhost.conf`

`localhost.conf` u açın ve şu bilgileri ekleyin.

[req]
prompt = no

distinguished_name = dn

[dn]
C = TR
ST = İstanbul
L = İstanbul

O = Kalorisiz Kod Yazılım
OU = Backend Birimi

CN = localhost

5. Dosyayı kaydedin.

6. Aşağıdaki komutla anahtar ve sertifika oluşturun (komutu tek satır olarak girin):

 ```
    openssl req -x509 -out ssl-localhost\localhost.crt -keyout ssl-localhost\localhost.key -newkey rsa:2048 -nodes -sha256 -days 365 -config localhost.conf
    ```

Komut, localhost.crt ve localhost.key adlı iki dosya oluşturacaktır.


Açıklamaları:

Parametre	Açıklama
req -x509	X.509 sertifikası oluşturur
-out ssl-localhost/localhost.crt	Çıktı sertifika dosyasının adı
-keyout ssl-localhost/localhost.key	Çıktı anahtar dosyasının adı
-newkey rsa:2048	RSA algoritmasıyla 2048 bit anahtar üretir
-nodes	DES şifreleme olmadan anahtar oluşturur
-sha256	SHA256 algoritmasını kullanır
-days 365	Sertifika 365 gün geçerli olacaktır
-config localhost.conf	Yapılandırma dosyasının adı

  > Daha fazla detaylı bilgi [için tıklayın](https://www.openssl.org/docs/man1.1.1/man1/openssl-req.html). 

7. Aşağıdakigibi bir output görmeniz gerekiyor:
    ```
    Generating a 2048 bit RSA private key
    .......+++
    ...............................+++
    writing new private key to 'ssl-localhost/localhost.key'
    ```

Tebrikler! Anahtar ve kendinden imzalı sertifikayı başarıyla oluşturdunuz. 🚀


## Mac ya da Linux


Mac ve Linux'ta OpenSSL işletim sistemiyle birlikte gelir, ek bir kurulum gerekmez.

### Anahtar ve Kendinden İmzalı Sertifika Oluşturma

1. Bir terminal penceresi açın.
2. Angular e-ticaret projenizin dizinine geçin:

    ```
    cd angular-ecommerce
    ```

3. Çıktı dosyalarınız için yeni bir dizin oluşturun:
    ```
    mkdir ssl-localhost
    ```
4. angular-ecommerce dizininde şu dosyayı oluşturun: localhost.conf. İçeriği:

[req]
prompt = no

distinguished_name = dn

[dn]
C = TR
ST = İstanbul
L = İstanbul

O = Kalorisiz Kod Yazılım
OU = Backend Birimi

CN = localhost

bu şekilde doldurun.

5. Dosyayı kaydedin.
6. Şu komutla anahtar ve sertifika oluşturun:

    ```
    openssl req -x509 \
      -out ssl-localhost/localhost.crt \
      -keyout ssl-localhost/localhost.key \
      -newkey rsa:2048 -nodes -sha256 -days 365 \
      -config localhost.conf
    ```

Açıklamaları:

Parametre	Açıklama
req -x509	X.509 sertifikası oluşturur
-out ssl-localhost/localhost.crt	Çıktı sertifika dosyasının adı
-keyout ssl-localhost/localhost.key	Çıktı anahtar dosyasının adı
-newkey rsa:2048	RSA algoritmasıyla 2048 bit anahtar üretir
-nodes	DES şifreleme olmadan anahtar oluşturur
-sha256	SHA256 algoritmasını kullanır
-days 365	Sertifika 365 gün geçerli olacaktır
-config localhost.conf	Yapılandırma dosyasının adı   

  > Daha fazla detaylı bilgi [için tıklayın](https://www.openssl.org/docs/man1.1.1/man1/openssl-req.html). 

7. Aşağıdakigibi bir output görmeniz gerekiyor:
    ```
    Generating a 2048 bit RSA private key
    .......+++
    ...............................+++
    writing new private key to 'ssl-localhost/localhost.key'
    ```

Tebrikler! Anahtar ve kendinden imzalı sertifikayı başarıyla oluşturdunuz. 🚀