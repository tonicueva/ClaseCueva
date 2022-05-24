<?php

require 'vendor/autoload.php';

MercadoPago/SDK::setAccesToken('TEST-7179558033471274-051919-9d83a70771c8bc7c1956404ed73aaeca-777498757');

$preference = new MercadoPago/Preference();

$item = new MercadoPago/Item();
$item->id = '0001';
$item->title = 'Producto CDP';
$item->quantity = 1;
$item->unit_price = 150.00;
$item->currency_id = "ARS";

$preference->items = array($item);
$preference->save();

?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
<script src="https://sdk.mercadopago.com/js/v2"></script>
</head>
<body>
    
    <h3>
        MecadoPago
    </h3>

    <div class="checkout-btn">

    </div>

    <script>
        const mp = new MercadoPago('TEST-f4ffcb5a-b3f9-41a1-bcc7-6d9ff26eabb9', {
            locale: 'es-AR'
        });

        mp.checkout({
            preference: {
                id: '<?php echo $preference->id; ?>'
            },
            render: {
                container: '.checkout-btn',
                label: 'Pagar con MP',
            }
        })
    </script>


</body>
</html>