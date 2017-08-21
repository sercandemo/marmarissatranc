---
title: Turnuvalar
permalink: turnuvalar/index.html
layout: default
---

<h3> Turnuvalar </h3>

{% assign myfiles = site.static_files | sort: 'name' | reverse %}
{% assign turnuva_sayisi = 0 %}

{% for myfile in myfiles %}

{% if myfile.path contains 'data/turnuvalar/' %}
{% assign turnuva_sayisi = turnuva_sayisi | plus: 1 %}
{% endif %}

{% endfor %}

<p>Bugüne kadar <strong> {{ turnuva_sayisi }} </strong> turnuva düzenlendi.</p>
<div class="row">

  <div class="col-md-9">
    <table class="table table-bordered table-striped">
    <tbody>
    <tr>
      <th>Tarih</th>
      <th>Turnuva Adı</th>
    </tr>

    {% for myfile in myfiles %}

    {% if myfile.path contains 'data/turnuvalar/' %}

    {% assign tarih = myfile.basename | split: '-' %}
    {% assign tarihs = tarih[0] | append: '-' | append: tarih[1] | append: '-' | append: tarih[2] %}

    <tr>
    <td class="col-md-4">
    {{ tarihs | date: "%-d" }}
    {% assign m = tarihs | date: "%-m" | minus: 1 %}
    {{ site.data.tr.months[m] }}
    {{ tarihs | date: "%Y" }}
    </td>
    <td class="col-md-8"><a href="{{ site.github.url }}/turnuvalar/{{ myfile.basename }}" > {{ site.data.turnuvalar[myfile.basename].adi }} </a></td>
    </tr>
    {% endif %}

    {% endfor %}

    </tbody>
    </table>
  </div>

  <div class="col-md-3">
      <div class="panel panel-default">
          <div class="panel-heading text-center">
              <h3 class="panel-title">Destekçilerimiz</h3>
          </div>
          <div class="panel-body">
              <a href="http://www.mimartmimarlik.net/" target="_blank">
                  <img src="{{ site.github.url }}/assets/images/mimart.jpg" alt="" class="img-responsive center-block" style="margin-bottom:20px">
              </a>
              <a href="http://marmaris.indigosatranc.com/anasayfa/selimiye_yazlik" target="_blank">
                  <img src="{{ site.github.url }}/assets/images/selimiyelogoweb.jpg" alt="" class="img-responsive center-block" style="margin-bottom:20px">
              </a>
              <a href="http://www.marti.com.tr/" target="_blank">
                  <img src="{{ site.github.url }}/assets/images/marti.jpg" alt="" class="img-responsive center-block">
              </a>

          </div>
      </div>
  </div>
</div>
