<!-- #SHOP  POPUP -->

http://127.0.0.1/openserver/phpmyadmin/import.php
https://shop.local/bags

Магазин
git@git.nuzhnapomosh.ru:shop/main.git

админка
https://shop.local/admin/

admin
3tjJoFVgL1yKp3TC - замена - admin

========================================= popup
catalog/view/theme/default/template/common/modal
C:/OpenServer/domains/shop/catalog/view/theme/default/template/common/modal


контроллер
catalog\controller\checkout\download.php
$data['order_ebook_email'] = $this->load->view('common/modal/order_ebook_email', $modal_data);
$data['order_ebook_email_confirmation'] = $this->load->view('common/modal/order_ebook_email_confirmation', $modal_data);

catalog/view/theme/default/template/common/download.twig

{{ order_ebook_email_confirmation }}


catalog/view/theme/default/template/common/modal/ebook_download_email.twig
catalog/view/theme/default/template/common/modal/ebook_download_email_confirmation.twig


catalog/view/javascript/modal/ebook-download-popup.js


git add catalog/view/theme/default/template/common/modal/ebook_download_email.twig
git add catalog/view/theme/default/template/common/modal/ebook_download_email_confirmation.twig


$data['order_ebook_email_confirmation'] = $this->load->view('common/modal/order_ebook_email_confirmation');

==================================================================================
