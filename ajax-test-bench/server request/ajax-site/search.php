<?php
    public function searchTitle()
    {
		$this->load->model('catalog/product');

        if (isset($this->request->get['title'])) {
            $search   = $this->request->get['title'];
            $response = $this->model_catalog_product->searchTitle($search);
            // testing array of titles
            // FIXME D: сделать загрузку при инициализации страницы
            $response = [
            'Футболка',
            'Футболка «Такие дела»',
            'Футболка «Невыносимо»',
            'Футболка «Будь собой»',
            'Футболка «Make Love»',
            'Футболка «Добро»',
            'Футболка «I am not an NPC',
            'Худи',
            'Худи «Лавандовое поле»',
            'Худи «Всё путём»',
            'Худи «Мои правила»',
            'Худи «Sweet home»',
            'Худи «Адекватно»',
            ];

            echo json_encode($response);

        } else {
            echo json_encode([]);
        }
    }

      // var_dump("---------------------------- var_dump search");
      // var_dump($search);

      // $titleArr = ['Футболка «Такие дела»', 'Футболка «Невыносимо»', 'Худи «Лавандовое поле»', 'Худи «Мои правила»'];
      // $data_json = json_encode($titleArr);

      // var_dump("---------------------------- var_dump titleArr");
      // var_dump($titleArr );

?>