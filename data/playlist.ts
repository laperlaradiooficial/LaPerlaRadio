import { Song } from '../types';

// Definimos las canciones del EP primero para usarlas tanto individualmente como dentro del álbum
const FELIM_EP_TRACKS: Song[] = [
  {
    id: 'ep-felim-1-1',
    title: 'Lio',
    artist: 'Felim',
    coverUrl: 'https://res.cloudinary.com/dlljikxgk/image/upload/v1769670001/PORTADA_EP_Spotify_kdcncq.jpg',
    audioUrl: 'https://res.cloudinary.com/dlljikxgk/video/upload/v1769669993/01._Lio_-_Felim_Prod_Nico_ie4ycr.wav',
    releaseDate: 'EP',
    isHidden: true // Oculto del grid principal, se ve a través del álbum
  },
  {
    id: 'ep-felim-1-2',
    title: 'Hey Ma',
    artist: 'Felim',
    coverUrl: 'https://res.cloudinary.com/dlljikxgk/image/upload/v1769670001/PORTADA_EP_Spotify_kdcncq.jpg',
    audioUrl: 'https://res.cloudinary.com/dlljikxgk/video/upload/v1769669995/02._Hey_Ma_-_Felim_Prod_Magic_nfli1h.wav',
    releaseDate: 'EP',
    isHidden: true
  },
  {
    id: 'ep-felim-1-3',
    title: 'Me enamoré de una P',
    artist: 'Felim',
    coverUrl: 'https://res.cloudinary.com/dlljikxgk/image/upload/v1769670001/PORTADA_EP_Spotify_kdcncq.jpg',
    audioUrl: 'https://res.cloudinary.com/dlljikxgk/video/upload/v1769669996/03._Me_enamore_de_una_P_-_Felim_Prod_Nohandz_z5fda3.wav',
    releaseDate: 'EP',
    isHidden: true
  },
  {
    id: 'ep-felim-1-4',
    title: 'Party Oscuro',
    artist: 'Felim x Javier Aguirre',
    coverUrl: 'https://res.cloudinary.com/dlljikxgk/image/upload/v1769670001/PORTADA_EP_Spotify_kdcncq.jpg',
    audioUrl: 'https://res.cloudinary.com/dlljikxgk/video/upload/v1769669996/04._Party_Oscuro_-_Felim_Javier_Aguirre_w5lrqq.wav',
    releaseDate: 'EP',
    isHidden: true
  },
  {
    id: 'ep-felim-1-5',
    title: '1234',
    artist: 'Felim x Bryan Bueno',
    coverUrl: 'https://res.cloudinary.com/dlljikxgk/image/upload/v1769670001/PORTADA_EP_Spotify_kdcncq.jpg',
    audioUrl: 'https://res.cloudinary.com/dlljikxgk/video/upload/v1769669999/05._1234_-_Felim_Bryan_Bueno_Prod_Nico_-_KA_czheju.wav',
    releaseDate: 'EP',
    isHidden: true
  },
  {
    id: 'ep-felim-1-6',
    title: 'Minitek',
    artist: 'Felim x Cris JP',
    coverUrl: 'https://res.cloudinary.com/dlljikxgk/image/upload/v1769670001/PORTADA_EP_Spotify_kdcncq.jpg',
    audioUrl: 'https://res.cloudinary.com/dlljikxgk/video/upload/v1769669999/06._Minitek_-_Felim_Cris_JP_Prod_KA_-_Nohandz_-_Nico_csohk5.wav',
    releaseDate: 'EP',
    isHidden: true
  },
  {
    id: 'ep-felim-1-7',
    title: 'Mamisonga',
    artist: 'Felim',
    coverUrl: 'https://res.cloudinary.com/dlljikxgk/image/upload/v1769670001/PORTADA_EP_Spotify_kdcncq.jpg',
    audioUrl: 'https://res.cloudinary.com/dlljikxgk/video/upload/v1769670002/07._Mamisonga_-_Felim_Prod_Nico_zz52ck.wav',
    releaseDate: 'EP',
    isHidden: true
  }
];

export const PLAYLIST_DATA: Song[] = [
  {
    id: '1',
    title: 'Bandido',
    artist: 'Gyan',
    coverUrl: 'https://res.cloudinary.com/dlljikxgk/image/upload/v1765928658/BANDIDO_bzi0yq.jpg',
    audioUrl: 'https://res.cloudinary.com/dlljikxgk/video/upload/v1765928660/BANDIDO_fr1a7r.mp3',
    releaseDate: 'Estreno'
  },
  {
    id: '2',
    title: 'Romantiguetto',
    artist: '4Five',
    coverUrl: 'https://res.cloudinary.com/dlljikxgk/image/upload/v1765926012/Romantiguetto_kkkore.jpg',
    audioUrl: 'https://res.cloudinary.com/dlljikxgk/video/upload/v1765926011/Romantiguetto_yxlduj.mp3',
    releaseDate: 'Nuevo'
  },
  {
    id: '3',
    title: 'Pa La Perla',
    artist: '4Five x Cris JP',
    coverUrl: 'https://res.cloudinary.com/dlljikxgk/image/upload/v1765925836/Pa_la_Perla_jupjd1.jpg',
    audioUrl: 'https://res.cloudinary.com/dlljikxgk/video/upload/v1765925839/4Five_-_Pa_la_perla_Ft._CRIS_JP_OFICIAL_Prod_By._KA_VIDEO_OFICIAL_ssw0ii.mp3',
    releaseDate: 'Hit'
  },
  {
    id: '4',
    title: 'Palestina',
    artist: 'Akira x Felim',
    coverUrl: 'https://res.cloudinary.com/dlljikxgk/image/upload/v1765922785/Palestina_vbtx5o.jpg',
    audioUrl: 'https://res.cloudinary.com/dlljikxgk/video/upload/v1765922796/Jungle_Stars_PALESTINA_Akira_Ft_Felim_mur8yq.mp3',
    releaseDate: 'Reciente'
  },
  {
    id: '5',
    title: 'Sinergia',
    artist: 'Akira',
    coverUrl: 'https://res.cloudinary.com/dlljikxgk/image/upload/v1765920730/Sinergia_cvojgi.jpg',
    audioUrl: 'https://res.cloudinary.com/dlljikxgk/video/upload/v1765920734/Sinergia_btzwm1.mp3',
    releaseDate: 'Destacado'
  },
  {
    id: '6',
    title: 'Naufrago Remix',
    artist: 'Bipo, Johny Ragzz, Esteban ZG, Gyan, Arod',
    coverUrl: 'https://res.cloudinary.com/dlljikxgk/image/upload/v1765923909/Naufrago_-_Remix_xeqetj.jpg',
    audioUrl: 'https://res.cloudinary.com/dlljikxgk/video/upload/v1765923918/Beepohlar_-_NAUFRAGO_REMIX_ft._Johnny_Ragzz_Esteban_ZG_Gyan_Arod_Video_Oficial_rqf26h.mp3',
    releaseDate: 'Remix'
  },
  {
    id: '7',
    title: 'Tin Pa que Tan',
    artist: 'Bipo x Pipe Calderon',
    coverUrl: 'https://res.cloudinary.com/dlljikxgk/image/upload/v1765923662/Tin_Pa_Que_Tan_hseetq.jpg',
    audioUrl: 'https://res.cloudinary.com/dlljikxgk/video/upload/v1765923662/Tin_Pa_Que_Tan_wokn3a.mp3',
    releaseDate: 'Nuevo'
  },
  {
    id: '8',
    title: 'Exotik',
    artist: 'Bryan Bueno',
    coverUrl: 'https://res.cloudinary.com/dlljikxgk/image/upload/v1765928519/Exotik_nf70nh.jpg',
    audioUrl: 'https://res.cloudinary.com/dlljikxgk/video/upload/v1765928528/ExotiK___%EF%B8%8F_BRYAN_BUENO_KA_PROD_El_VIDEO_umipcz.mp3',
    releaseDate: 'Nuevo'
  },
  {
    id: '9',
    title: 'Bañaita en sudor',
    artist: 'Bryan Bueno',
    coverUrl: 'https://res.cloudinary.com/dlljikxgk/image/upload/v1765926322/Ba%C3%B1adita_en_Sudor_gl5rbg.jpg',
    audioUrl: 'https://res.cloudinary.com/dlljikxgk/video/upload/v1765926321/Ba%C3%B1adita_en_sudor_BRYAN_BUENO_KA_PROD_El_VIDEO_urebto.mp3',
    releaseDate: 'Hit'
  },
  {
    id: '10',
    title: 'Discoteca',
    artist: 'Felim',
    coverUrl: 'https://res.cloudinary.com/dlljikxgk/image/upload/v1765924506/Discoteca_wlkgjb.jpg',
    audioUrl: 'https://res.cloudinary.com/dlljikxgk/video/upload/v1765924507/Discoteca_runrlc.mp3',
    releaseDate: 'Reciente'
  },
  {
    id: '11',
    title: 'Gelato',
    artist: 'Felim x Bryan Bueno x Cris Jp',
    coverUrl: 'https://res.cloudinary.com/dlljikxgk/image/upload/v1765921150/GELATO_mhk2z4.jpg',
    audioUrl: 'https://res.cloudinary.com/dlljikxgk/video/upload/v1765921152/GELATO_furacg.mp3',
    releaseDate: 'Colab'
  },
  {
    id: '12',
    title: 'Delito',
    artist: 'Felim',
    coverUrl: 'https://res.cloudinary.com/dlljikxgk/image/upload/v1765920551/Delito_cbs91j.jpg',
    audioUrl: 'https://res.cloudinary.com/dlljikxgk/video/upload/v1765920551/Delito_zydppd.mp3',
    releaseDate: 'Urbano'
  },
  {
    id: '13',
    title: 'Me pega',
    artist: 'Cris Jp x Koya',
    coverUrl: 'https://res.cloudinary.com/dlljikxgk/image/upload/v1765925722/Me_Pega_zkfplg.jpg',
    audioUrl: 'https://res.cloudinary.com/dlljikxgk/video/upload/v1765925718/Me_Pega_feat._CRIS_JP_Cristhian_Arenas_al2r27.mp3',
    releaseDate: 'Nuevo'
  },
  {
    id: '14',
    title: 'Soy Yo',
    artist: 'Cris Jp',
    coverUrl: 'https://res.cloudinary.com/dlljikxgk/image/upload/v1765925365/SOY_YO_robkv0.jpg',
    audioUrl: 'https://res.cloudinary.com/dlljikxgk/video/upload/v1765925380/CRIS_JP_-_SOY_YO_VIDEO_OFICIAL_gsowse.mp3',
    releaseDate: 'Destacado'
  },
  {
    id: '15',
    title: 'Dembow',
    artist: 'Cris Jp',
    coverUrl: 'https://res.cloudinary.com/dlljikxgk/image/upload/v1765925189/DEMBOW_zitxrq.jpg',
    audioUrl: 'https://res.cloudinary.com/dlljikxgk/video/upload/v1765925193/CRIS_JP_-_DEMBOW_xtgsys.mp3',
    releaseDate: 'Clásico'
  },
  {
    id: '16',
    title: 'Calor',
    artist: 'Koya',
    coverUrl: 'https://res.cloudinary.com/dlljikxgk/image/upload/v1765927407/Calor_ls062z.jpg',
    audioUrl: 'https://res.cloudinary.com/dlljikxgk/video/upload/v1765927408/Calor_yd0jh7.mp3',
    releaseDate: 'Nuevo'
  },
  {
    id: '17',
    title: 'Caliente',
    artist: 'Lebron DelGhetto x Bakzord x Lia',
    coverUrl: 'https://res.cloudinary.com/dlljikxgk/image/upload/v1765927646/Caliente_puzx1w.jpg',
    audioUrl: 'https://res.cloudinary.com/dlljikxgk/video/upload/v1765927658/Caliente_cvzh2i.mp3',
    releaseDate: 'Hit'
  },
  {
    id: '18',
    title: 'Minina',
    artist: 'Lia',
    coverUrl: 'https://res.cloudinary.com/dlljikxgk/image/upload/v1765927571/Minina_bijimh.jpg',
    audioUrl: 'https://res.cloudinary.com/dlljikxgk/video/upload/v1765927572/Minina_bo7ik7.mp3',
    releaseDate: 'Destacado'
  },
  {
    id: '19',
    title: 'Látigo',
    artist: 'Lebron DelGhetto x Bakzord x Pereiranboy',
    coverUrl: 'https://res.cloudinary.com/dlljikxgk/image/upload/v1765923383/L%C3%A1tigo_nl5gc9.jpg',
    audioUrl: 'https://res.cloudinary.com/dlljikxgk/video/upload/v1765923384/L%C3%A1tigo_w5ozcw.mp3',
    releaseDate: 'Remix'
  },
  {
    id: '20',
    title: 'TOTOQ',
    artist: 'Lebron DelGhetto x Bakzord x Akira',
    coverUrl: 'https://res.cloudinary.com/dlljikxgk/image/upload/v1765920891/Totoq_u04y01.jpg',
    audioUrl: 'https://res.cloudinary.com/dlljikxgk/video/upload/v1765920893/Totoq_ltc25r.mp3',
    releaseDate: 'Reciente'
  },
  {
    id: '21',
    title: 'El ultimo trago',
    artist: 'Marlon Alvarez x Bryan Bueno',
    coverUrl: 'https://res.cloudinary.com/dlljikxgk/image/upload/v1765928123/El_%C3%9Altimo_Trago_tdvrnj.jpg',
    audioUrl: 'https://res.cloudinary.com/dlljikxgk/video/upload/v1765928128/El_%C3%9Altimo_Trago_-_Marlon_%C3%81lvarez_Ft_Bryan_Bueno_K.A_Prod_kmwz09.mp3',
    releaseDate: 'Nuevo'
  },
  {
    id: '22',
    title: 'La Pared',
    artist: 'Marlon Alvarez',
    coverUrl: 'https://res.cloudinary.com/dlljikxgk/image/upload/v1765928016/La_Pared_hs82ek.jpg',
    audioUrl: 'https://res.cloudinary.com/dlljikxgk/video/upload/v1765928020/La_Pared_mqocuf.mp3',
    releaseDate: 'Romántico'
  },
  {
    id: '23',
    title: 'La Julia',
    artist: 'Pereiranboy x Koya',
    coverUrl: 'https://res.cloudinary.com/dlljikxgk/image/upload/v1765921869/La_Julia_duompj.jpg',
    audioUrl: 'https://res.cloudinary.com/dlljikxgk/video/upload/v1765921873/La_Julia_-_Pereiranboy_-_Koya_Video_Oficial_sl7kds.mp3',
    releaseDate: 'Local'
  },
  {
    id: '24',
    title: 'Party Up',
    artist: 'Cris Jp x Pereiranboy x Felim',
    coverUrl: 'https://res.cloudinary.com/dlljikxgk/image/upload/v1765921275/Party_up_tuja8w.jpg',
    audioUrl: 'https://res.cloudinary.com/dlljikxgk/video/upload/v1765921274/PARTY_UP_-_PEREIRANBOY-_FELIM_-CRISJP_VIDEO_OFICIAL_zv7sfq.mp3',
    releaseDate: 'Fiesta'
  },
  {
    id: '25',
    title: 'Blokeau',
    artist: 'Starboy',
    coverUrl: 'https://res.cloudinary.com/dlljikxgk/image/upload/v1765927826/Blokeau_ihu8nv.jpg',
    audioUrl: 'https://res.cloudinary.com/dlljikxgk/video/upload/v1765927827/STAR_-_BLOKEAU_Lyrics_qj2ekq.mp3',
    releaseDate: 'Trap'
  },
  {
    id: '26',
    title: 'Diosa',
    artist: 'Starboy x Bryan Bueno',
    coverUrl: 'https://res.cloudinary.com/dlljikxgk/image/upload/v1765931813/Diosa_dc5a76.jpg',
    audioUrl: 'https://res.cloudinary.com/dlljikxgk/video/upload/v1765931823/STARBOY_BRYAN_BUENO_KA_-_DIOSA_kph1ww.mp3',
    releaseDate: 'Estreno'
  },
  {
    id: '27',
    title: 'Loca',
    artist: 'Esteban ZG',
    coverUrl: 'https://res.cloudinary.com/dlljikxgk/image/upload/v1765924318/Loca_kohdde.jpg',
    audioUrl: 'https://res.cloudinary.com/dlljikxgk/video/upload/v1765924321/LOCA_-_Esteban_ZG_Video_oficial_ezme8t.mp3',
    releaseDate: 'Nuevo'
  },
  {
    id: '28',
    title: 'Traje Perreo',
    artist: 'Esteban ZG x Cris JP',
    coverUrl: 'https://res.cloudinary.com/dlljikxgk/image/upload/v1765924217/Traje_Perreo_fpjayp.jpg',
    audioUrl: 'https://res.cloudinary.com/dlljikxgk/video/upload/v1765924220/CRIS_JP_EstebanZG__-_TRAJE_PERREO_VIDEO_OFICIAL_jzx7ht.mp3',
    releaseDate: 'Fiesta'
  },
  {
    id: '29',
    title: 'DOSMIL12',
    artist: 'Esteban ZG',
    coverUrl: 'https://res.cloudinary.com/dlljikxgk/image/upload/v1765944760/DOSMIL12_nifwta.jpg',
    audioUrl: 'https://res.cloudinary.com/dlljikxgk/video/upload/v1765944766/DOSMIL12_zj1v4s.mp3',
    releaseDate: 'Nuevo'
  },
  {
    id: '30',
    title: 'Casualidad',
    artist: 'Bipo',
    coverUrl: 'https://res.cloudinary.com/dlljikxgk/image/upload/v1765945820/CASUALIDAD_wnqzpc.jpg',
    audioUrl: 'https://res.cloudinary.com/dlljikxgk/video/upload/v1765945822/BIPO_Chris_B_Ghost_-_CASUALIDAD_dfznep.mp3',
    releaseDate: 'Nuevo'
  },
  {
    id: '31',
    title: 'Don Cora',
    artist: 'Cris JP',
    coverUrl: 'https://res.cloudinary.com/dlljikxgk/image/upload/v1765946609/DON_CORA_yn54jp.jpg',
    audioUrl: 'https://res.cloudinary.com/dlljikxgk/video/upload/v1765946611/CRIS_JP_-_DON_CORA_ypc0z2.mp3',
    releaseDate: 'Nuevo'
  },
  {
    id: '32',
    title: 'Remate',
    artist: 'Pereiranboy',
    coverUrl: 'https://res.cloudinary.com/dlljikxgk/image/upload/v1765946935/Remate_ghz0i3.jpg',
    audioUrl: 'https://res.cloudinary.com/dlljikxgk/video/upload/v1765946936/Remate_ylqoi1.mp3',
    releaseDate: 'Nuevo'
  },
  {
    id: '33',
    title: 'Me la voy a perrear',
    artist: 'Koya',
    coverUrl: 'https://res.cloudinary.com/dlljikxgk/image/upload/v1765947345/Me_la_voy_a_perrear_ckrxuv.jpg',
    audioUrl: 'https://res.cloudinary.com/dlljikxgk/video/upload/v1765947346/Me_la_voy_a_perrear_vr4352.mp3',
    releaseDate: 'Nuevo'
  },
  {
    id: '34',
    title: 'El wiken',
    artist: 'Bipo',
    coverUrl: 'https://res.cloudinary.com/dlljikxgk/image/upload/v1765947608/El_Wiken_ba5vtd.jpg',
    audioUrl: 'https://res.cloudinary.com/dlljikxgk/video/upload/v1765947609/El_Wiken_zrzhkt.mp3',
    releaseDate: 'Nuevo'
  },
  {
    id: '35',
    title: 'GTA',
    artist: 'Esteban ZG',
    coverUrl: 'https://res.cloudinary.com/dlljikxgk/image/upload/v1765959613/GTA_lyghle.jpg',
    audioUrl: 'https://res.cloudinary.com/dlljikxgk/video/upload/v1765959615/GTA_-_Esteban_ZG_v%C3%ADdeo_oficial_eb5wtf.mp3',
    releaseDate: 'Nuevo'
  },
  {
    id: '36',
    title: 'Preso de tu alma',
    artist: 'Bryan Bueno',
    coverUrl: 'https://res.cloudinary.com/dlljikxgk/image/upload/v1769671723/Preso_de_Tu_Alma_pjfotz.jpg',
    audioUrl: 'https://res.cloudinary.com/dlljikxgk/video/upload/v1769671724/Preso_de_Tu_Alma_j1ut7j.mp3',
    releaseDate: 'Estreno'
  },
  {
    id: '37',
    title: 'Xime',
    artist: 'Pereiranboy',
    coverUrl: 'https://res.cloudinary.com/dlljikxgk/image/upload/v1769672566/final.jpg_sj8lmi.jpg',
    audioUrl: 'https://res.cloudinary.com/dlljikxgk/video/upload/v1769672727/XIME_master_4_vhku9s.wav',
    releaseDate: 'Nuevo'
  },
  {
    id: '38',
    title: 'Bellaka',
    artist: '4Five',
    coverUrl: 'https://res.cloudinary.com/dlljikxgk/image/upload/v1769672523/Bellaka_itdejc.jpg',
    audioUrl: 'https://res.cloudinary.com/dlljikxgk/video/upload/v1769672524/Bellaka_oxqdsj.mp3',
    releaseDate: 'Estreno'
  },
  {
    id: '39',
    title: 'Trakata',
    artist: 'Pereiranboy',
    coverUrl: 'https://res.cloudinary.com/dlljikxgk/image/upload/v1769674455/TRAKATA_liieen.jpg',
    audioUrl: 'https://res.cloudinary.com/dlljikxgk/video/upload/v1769674461/TRAKATA_feat._Cristhian_Arenas_sbaqng.mp3',
    releaseDate: 'Nuevo'
  },
  {
    id: '40',
    title: 'Callaito',
    artist: 'Danny Cr',
    coverUrl: 'https://res.cloudinary.com/dlljikxgk/image/upload/v1769674567/Callaito_lea6i8.jpg',
    audioUrl: 'https://res.cloudinary.com/dlljikxgk/video/upload/v1769674575/Callaito_jvu7fs.mp3',
    releaseDate: 'Estreno'
  },
  {
    id: '41',
    title: 'Sativa',
    artist: 'Danny Cr',
    coverUrl: 'https://res.cloudinary.com/dlljikxgk/image/upload/v1769674583/Sativa_xfrg0k.jpg',
    audioUrl: 'https://res.cloudinary.com/dlljikxgk/video/upload/v1769674588/DANNY_CR_-sativa_video_official_snnkd7.mp3',
    releaseDate: 'Nuevo'
  },
  {
    id: '42',
    title: 'Candela',
    artist: 'Cris JP',
    coverUrl: 'https://res.cloudinary.com/dlljikxgk/image/upload/v1769674735/Candela_roj1zg.jpg',
    audioUrl: 'https://res.cloudinary.com/dlljikxgk/video/upload/v1769674742/CANDELA_nsbw8u.mp3',
    releaseDate: 'Hit'
  },
  {
    id: '43',
    title: 'Dilema',
    artist: 'Felim',
    coverUrl: 'https://res.cloudinary.com/dlljikxgk/image/upload/v1769674840/Dilema_cdmg7i.jpg',
    audioUrl: 'https://res.cloudinary.com/dlljikxgk/video/upload/v1769674861/Dilema_d5sefg.mp3',
    releaseDate: 'Nuevo'
  },
  {
    id: '44',
    title: 'Culo Nuevo',
    artist: 'Felim',
    coverUrl: 'https://res.cloudinary.com/dlljikxgk/image/upload/v1769674850/Culo_Nuevo_hxzjcg.jpg',
    audioUrl: 'https://res.cloudinary.com/dlljikxgk/video/upload/v1769674850/Culo_Nuevo_taxexx.mp3',
    releaseDate: 'Nuevo'
  },
  {
    id: '45',
    title: 'Voodoo',
    artist: 'Lebron DelGhetto',
    coverUrl: 'https://res.cloudinary.com/dlljikxgk/image/upload/v1769675001/Voodoo_lplj7g.jpg',
    audioUrl: 'https://res.cloudinary.com/dlljikxgk/video/upload/v1769675008/Voodoo_evo61a.mp3',
    releaseDate: 'Estreno'
  },
  {
    id: '46',
    title: 'Butaka',
    artist: 'Pereiranboy',
    coverUrl: 'https://res.cloudinary.com/dlljikxgk/image/upload/v1769677275/Butaka_xridfe.jpg',
    audioUrl: 'https://res.cloudinary.com/dlljikxgk/video/upload/v1769677283/Pereiranboy_Butaka_x_ritmorecords_dancehallmusic_av8wej.mp3',
    releaseDate: 'Nuevo'
  },
  
  // INCLUIMOS LOS TRACKS DEL EP AL FINAL (Para que en orden inverso queden arriba)
  ...FELIM_EP_TRACKS,

  // ÍTEM VISUAL DEL ÁLBUM (Sin audioUrl, contiene tracks) - AL FINAL DEL TODO
  {
    id: 'ep-felim-visual',
    title: 'Es Felim Okay',
    artist: 'Felim',
    coverUrl: 'https://res.cloudinary.com/dlljikxgk/image/upload/v1769670001/PORTADA_EP_Spotify_kdcncq.jpg',
    releaseDate: 'EP EXCLUSIVO',
    tracks: FELIM_EP_TRACKS
  },
  {
    id: '47',
    title: 'Traje Perreo (REMIX)',
    artist: 'Cris JP x Esteban ZG x Felim x 4Five',
    coverUrl: 'https://res.cloudinary.com/dwahbaa1r/image/upload/v1771603651/Traje_Perreo_-_Remix_woa1gu.jpg',
    audioUrl: 'https://res.cloudinary.com/dwahbaa1r/video/upload/v1771603654/Traje_Perreo_Remix_nviz8g.mp3',
    releaseDate: 'Remix'
  },
  {
    id: '48',
    title: 'Casualidad',
    artist: 'Marlon Alvarez',
    coverUrl: 'https://res.cloudinary.com/dwahbaa1r/image/upload/v1771605326/Casualidad_1_lnpzpr.jpg',
    audioUrl: 'https://res.cloudinary.com/dwahbaa1r/video/upload/v1771605659/MARLON_ALVAREZ_-_CASUALIDAD_OFFICIAL_VIDEO_teed3j.wav',
    releaseDate: 'Nuevo'
  },
  {
    id: '49',
    title: 'Francia',
    artist: 'Bryan Bueno',
    coverUrl: 'https://res.cloudinary.com/dwahbaa1r/image/upload/v1771606621/Francia_tmmqqj.jpg',
    audioUrl: 'https://res.cloudinary.com/dwahbaa1r/video/upload/v1771606585/FRANCIA_BRYAN_BUENO_KA_PROD_El_VIDEO_x1wyv8.wav',
    releaseDate: 'Nuevo'
  },
];