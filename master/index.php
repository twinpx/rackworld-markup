<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("������ ������� ����� �����������������");
?>

<link href="/markup/master/master.css" type="text/css"  rel="stylesheet" />
<script src="/markup/master/master.js"></script>

<div id="tires-master-mobile">������ ������� ����� �����������������</div>
<div id="tires-master">
  <div id="tires-master-tabs">
    <span class="tires-master-tabs__item" data-tab="parameter">�� ����������</span>
    <span class="tires-master-tabs__item" data-tab="car">�� ����</span>
  </div>
  
  <div class="tires-master-tab i-active" data-tab="parameter">
    <form action="/markup/master/result.html" method="GET">
      <div class="select-column">
        <label>��� ����������</label>
        <select name="type" id="tires-master-select4" data-ajax="/markup/master/select4.json" data-method="GET" data-default="�">
          <option>�</option>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
      </div>
      <div class="decor-column"></div>
      <div class="select-column">
        <label>������</label>
        <select name="width" id="tires-master-select5" data-ajax="/markup/master/select5.json" data-method="GET" data-isdisabled="true" disabled="disabled" data-default="�">
          <option>�</option>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
      </div>
	  <div class="decor-column">/</div>
      <div class="select-column">
        <label>������</label>
        <select name="height" id="tires-master-select6" data-ajax="/markup/master/select6.json" data-isdisabled="true" disabled="disabled" data-default="�">
          <option>�</option>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
      </div>
      <div class="decor-column">R</div>
      <div class="select-column">
        <label>�������</label>
        <select name="diam" id="tires-master-select7" data-isdisabled="true" disabled="disabled" data-default="�">
          <option>�</option>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
      </div>
      <div class="clearfix"></div>
      <div class="tires-master-buttons">
		<button type="submit" class="bx_filter_search_button btn btn-default ">���������</button>
        <span class="bx_filter_search_reset_main btn btn-default white">��������</span>
      </div>
    </form>
  </div>
  
  <div class="tires-master-tab i-active" data-tab="car">
    <form action="/markup/master/result.html" method="GET">
      <div class="select-column">
        <label>�����</label>
        <select name="mark" id="tires-master-select1" data-ajax="/markup/master/select1.json" data-method="GET" data-default="�">
          <option>�</option>
          <option value="1">1</option>
          <option value="2">3</option>
        </select>
      </div>
      <div class="decor-column"></div>
      <div class="select-column">
        <label>������</label>
        <select name="model" id="tires-master-select2" data-ajax="/markup/master/select2.json" data-method="GET" data-isdisabled="true" disabled="disabled" data-default="�">
          <option>�</option>
          <option value="1">1</option>
          <option value="2">3</option>
        </select>
      </div>
      <div class="decor-column"></div>
      <div class="select-column">
		  <label>������/������</label>
        <select name="parameters" id="tires-master-select3" data-isdisabled="true" disabled="disabled" data-default="�">
          <option>�</option>
          <option value="1">1</option>
          <option value="2">3</option>
        </select>
      </div>
      <div class="clearfix"></div>
      <div class="tires-master-buttons">
        <button type="submit" class="bx_filter_search_button btn btn-default ">���������</button>
        <span class="bx_filter_search_reset_main btn btn-default white">��������</span>
      </div>
    </form>
  </div>
</div>

<div id="right_block_ajax"></div>

<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>